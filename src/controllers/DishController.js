const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

const knex = require('../database');

const DiskStorage = require('../providers/DiskStorage');
const diskStorage = new DiskStorage();

class DishController {
    async create(request, response) {
        const { title, description, ingredients, price, type, url } = request.body;

        verifyData.infoExists({ title, description });

        verifyData.ingredientsInfoExists({ ingredients });

        verifyData.priceIsEmptyAndNotANumber({ price });

        const formattedTitle = title.trim();
        const formattedDescription = description.trim().split(/\s+/).join(' ');
        const formattedPrice = parseFloat(price).toFixed(2);

        const mealId = await knex("dish").insert({
            title: formattedTitle,
            description: formattedDescription,
            price: formattedPrice,
        });

        const formattedIngredients = ingredients.map((ingredient) => ({
            dish_id: mealId[0],
            name: ingredient,
        }));
        
        await knex("dishIngredients").insert(formattedIngredients);

        return response.status(201).json({
            message: 'Refeição criada com sucesso.',
            mealId,
            type,
            url
        });
    };

    async update(request, response) {
        const { id } = request.params;
        const { newTitle, newDescription, newIngredients, newPrice } = request.body;
        
        const dishVerification = await knex("dish").where({ id }).first();

        if(!dishVerification) {
            return verifyData.mealVerificationIfExists({ verifier: dishVerification });
        };
        
        verifyData.infoExists({ title: newTitle, description: newDescription });

        verifyData.ingredientsInfoExists({ ingredients: newIngredients });

        verifyData.priceIsEmptyAndNotANumber({ price: newPrice });

        const formattedNewTitle = newTitle.trim();
        const formattedNewDescription = newDescription.trim().split(/\s+/).join(' ');
        const formattedNewPrice = newPrice.toFixed(2);

        const updatedDish = {
            title: formattedNewTitle,
            description: formattedNewDescription,
            price: formattedNewPrice
        };

        await knex("dish").where({ id }).update(updatedDish);

        const formattedNewIngredients = newIngredients.map((newIngredient) => ({
            dish_id: id,
            name: newIngredient
        }));
        
        await knex("dishIngredients").where({ dish_id: id}).delete();
        await knex("dishIngredients").where({ dish_id: id }).insert(formattedNewIngredients);

        return response.status(200).json({
            message: 'Refeição atualizada com sucesso.'
        });
    };

    async index(request, response) {
        const { title } = request.query;
        
        const dishes = await knex("dish").modify(queryBuilder => {
            if (title) {
                queryBuilder.whereLike("title", `%${title}%`);
            }
        });

        const ingredients = await knex("dishIngredients");

        const dishesWithIngredients = dishes.map((dish) => {
            const dishIngredients = ingredients
                .filter(ingredient => ingredient.dish_id === dish.id)
                .map(ingredient => ingredient.name)

            return {
                ...dish,
                ingredients: dishIngredients
            };
        });

        return response.status(200).json(dishesWithIngredients);
    };

    async show(request, response) {
        const { id } = request.params;

        const dish = await knex("dish").where({ id }).first();

        if(!dish) {
            return verifyData.mealVerificationIfExists({ verifier: dish });
        };

        const dishIngredients = await knex("dishIngredients").where({ dish_id: id });

        const dishWithIngredients = {
            ...dish,
            ingredients: dishIngredients.map(ingredient => ingredient.name)
        };

        return response.status(200).json(dishWithIngredients);
    };

    async delete(request, response) {
        const { id } = request.params;

        const dishVerification = await knex("dish").where({ id }).first();

        if(!dishVerification) {
            return verifyData.mealVerificationIfExists({ verifier: dishVerification });
        };

        await knex("dish").where({ id }).delete();

        return response.status(200).json({
            message: 'Refeição excluída com sucesso.'
        });
    };

    async updateImage(request, response) {
        const { id } = request.params;
        const imageFilename = request.file.filename;

        const dish = await knex("dish").where({ id }).first();

        if(dish.image) {
            await diskStorage.deleteFile(dish.image);
        }

        const file = await diskStorage.saveFile(imageFilename);

        dish.image = file;

        await knex("dish").update(dish).where({ id });

        return response.status(200).json(dish);
    }
};

module.exports = DishController;