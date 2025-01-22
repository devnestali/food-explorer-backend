const knex = require('../database');

const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

const DiskStorage = require('../providers/DiskStorage');
const diskStorage = new DiskStorage();

class DessertController {
    async create(request, response) {
        const { title, description, ingredients, price, type, url } = request.body;
        
        verifyData.infoExists({ title, description });
        
        verifyData.ingredientsInfoExists({ ingredients });

        verifyData.priceIsEmptyAndNotANumber({ price });

        const formattedTitle = title.trim();
        const formattedDescription = description.trim().split(/\s+/). join(' ');
        const formattedPrice = parseFloat(price).toFixed(2);
        
        const mealId = await knex("dessert").insert({
            title: formattedTitle,
            description: formattedDescription,
            price: formattedPrice,
        });

        const formattedIngredients = ingredients.map((ingredient) => ({
            dessert_id: mealId[0],
            name: ingredient,
        }));

        await knex("dessertIngredients").insert(formattedIngredients);
        
        return response.status(201).json({
            message: 'Sobremesa criada com sucesso',
            mealId,
            type,
            url
        });
    };

    async update(request, response) {
        const { id } = request.params;
        const { newTitle, newDescription, newIngredients, newPrice } = request.body;
        
        const dessertVerification = await knex("dessert").where({ id }).first();

        if(!dessertVerification) {
            return verifyData.mealVerificationIfExists({ verifier: dessertVerification });
        };
        
        verifyData.infoExists({ title: newTitle, description: newDescription });

        verifyData.ingredientsInfoExists({ ingredients: newIngredients });

        verifyData.priceIsEmptyAndNotANumber({ price: newPrice });

        const formattedNewTitle = newTitle.trim();
        const formattedNewDescription = newDescription.trim().split(/\s+/).join(' ');
        const formattedNewPrice = parseFloat(newPrice).toFixed(2);

        const updatedDessert = {
            title: formattedNewTitle,
            description: formattedNewDescription,
            price: formattedNewPrice
        };

        await knex("dessert").where({ id }).update(updatedDessert);

        const formattedNewIngredients = newIngredients.map((newIngredient) => ({
            dessert_id: id,
            name: newIngredient
        }));
        
        await knex("dessertIngredients").where({ dessert_id: id}).delete();
        await knex("dessertIngredients").where({ dessert_id: id }).insert(formattedNewIngredients);

        return response.status(200).json({
            message: 'Sobremesa atualizada com sucesso.'
        });
    };

    async index(request, response) {
        const { title } = request.query;
        
        const desserts = await knex("dessert").modify(queryBuilder => {
            if (title) {
                queryBuilder.whereLike("title", `%${title}%`);
            }
        });

        const dessertIngredients = await knex("dessertIngredients");

        const dessertsWithIngredients = desserts.map(dessert => {
            const dessertIngredient = dessertIngredients
                .filter(ingredient => ingredient.dessert_id === dessert.id)
                .map(ingredient => ingredient.name);
                
            return {
                ...dessert,
                ingredients: dessertIngredient
            };
        });

        return response.status(200).json(dessertsWithIngredients);
    };

    async show(request, response) {
        const { id } = request.params;

        const dessert = await knex("dessert").where({ id }).first();

        if(!dessert) {
            return verifyData.mealVerificationIfExists({ verifier: dessert});
        };

        const dessertIngredients = await knex("dessertIngredients").where({ dessert_id: id});

        const dessertWithIngredients = {
            ...dessert,
            ingredients: dessertIngredients.map(ingredient => ingredient.name)
        };

        return response.status(200).json(dessertWithIngredients);
    };

    async delete(request, response) {
        const { id } = request.params;

        const dessertVerification = await knex("dessert").where({ id }).first();

        if(!dessertVerification) {
            return verifyData.mealVerificationIfExists({ verifier: dessertVerification});
        };

        await knex("dessert").where({ id }).delete();

        return response.status(200).json({
            message: 'Sobremesa excluida com sucesso.'
        });
    };

    async updateImage(request, response) {
        const { id } = request.params;
        const imageFilename = request.file.filename;
        
        const dessert = await knex("dessert").where({ id }).first();

        if(dessert.image) {
            await diskStorage.deleteFile(dessert.image);
        }

        const file = await diskStorage.saveFile(imageFilename);

        dessert.image = file;

        await knex("dessert").update(dessert).where({ id });

        return response.status(200).json(dessert);
    }
};

module.exports = DessertController;