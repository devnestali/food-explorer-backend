const knex = require('../database');

const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

const DiskStorage = require('../providers/DiskStorage');
const diskStorage = new DiskStorage();

class DrinkController {
    async create(request, response) {
        const { title, description, ingredients, price } = request.body;

        verifyData.infoExists({ title, description });

        verifyData.ingredientsInfoExists({ ingredients });

        verifyData.priceIsEmptyAndNotANumber({ price });

        const formattedTitle = title.trim();
        const formattedDescription = description.trim().split(/\s+/).join(' ');
        const formattedPrice = price.toFixed(2);
        
        const drink_id = await knex("drink").insert({
            title: formattedTitle,
            description: formattedDescription,
            price: formattedPrice,
        });

        const formattedIngredients = ingredients.map((ingredient) => ({
            drink_id: drink_id[0],
            name: ingredient,
        }));
        
        await knex("drinkIngredients").insert(formattedIngredients);

        return response.status(201).json({
            message: 'Bebida criada com sucesso.'
        });
    };

    async update(request, response) {
        const { id } = request.params;
        const { newTitle, newDescription, newIngredients, newPrice } = request.body;

        const drinkVerification = await knex("drink").where({ id }).first();

        if(!drinkVerification) {
            return verifyData.mealVerificationIfExists({ verifier: drinkVerification });
        };
        
        verifyData.infoExists({ title: newTitle, description: newDescription });

        verifyData.ingredientsInfoExists({ ingredients: newIngredients });

        verifyData.priceIsEmptyAndNotANumber({ price: newPrice });

        const formattedNewTitle = newTitle.trim();
        const formattedNewDescription = newDescription.trim().split(/\s+/).join(' ');
        const formattedNewPrice = newPrice.toFixed(2);

        const updatedDrink = {
            title: formattedNewTitle,
            description: formattedNewDescription,
            price: formattedNewPrice
        };

        await knex("drink").where({ id }).update(updatedDrink);

        const formattedNewIngredients = newIngredients.map((newIngredient) => ({
            drink_id: id,
            name: newIngredient
        }));
        
        await knex("drinkIngredients").where({ drink_id: id}).delete();
        await knex("drinkIngredients").where({ drink_id: id }).insert(formattedNewIngredients);

        return response.status(200).json({
            message: 'Bebida atualizada com sucesso.'
        });
    };

    async index(request, response) {
        const drinks = await knex("drink").select("id", "title", "description", "price");

        const ingredients = await knex("drinkIngredients").select("id", "drink_id", "name");

        const drinksWithIngredients = drinks.map((drink) => {
            const drinkIngredients = ingredients
               .filter(ingredient => ingredient.drink_id === drink.id)
               .map(ingredient => ingredient.name);

            return {
                ...drink,
                ingredients: drinkIngredients
            };
        });

        return response.status(200).json(drinksWithIngredients);
    };

    async show(request, response) {
        const { id } = request.params;

        const drink = await knex("drink").where({ id }).first();

        if(!drink) {
            return verifyData.mealVerificationIfExists({ verifier: drink });
        };

        const ingredients = await knex("drinkIngredients").where({ drink_id: id });

        const drinkWithIngredients = {
            ...drink,
            ingredients
        };

        return response.status(200).json(drinkWithIngredients);
    };

    async delete(request, response) {
        const { id } = request.params;

        const drinkVerification = await knex("drink").where({ id }).first();

        if(!drinkVerification) {
            return verifyData.mealVerificationIfExists({ verifier: drinkVerification });
        };

        await knex("drink").where({ id }).delete();

        return response.status(200).json({
            message: 'Bebida excluída com sucesso.'
        });
    };

    async updateImage(request, response) {
        const { id } = request.params;
        const imageFilename = request.file.filename;

        const drink = await knex("drink").where({ id }).first();

        if(!drink) {
            return verifyData.mealVerificationIfExists({ verifier: drink });
        };

        if(drink.image) {
            await diskStorage.deleteFile(drink.image);
        };

        const file = await diskStorage.saveFile(imageFilename);

        drink.image = file;

        await knex("drink").where({ id }).update(drink);

        return response.status(200).json(drink);
    }
        
};

module.exports = DrinkController;