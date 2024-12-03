const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

const knex = require('../database');

class DishController {
    async create(request, response) {
        const { title, description, ingredients, price} = request.body;

        verifyData.infoExists(title, description);

        verifyData.ingredientsInfoExists(ingredients);

        verifyData.priceIsEmptyAndNotANumber(price);

        const formattedTitle = title.trim();
        const formattedDescription = description.trim().split(/\s+/).join(' ');
        const formattedPrice = price.toFixed(2);
        
        const dish_id = await knex("dish").insert({
            title: formattedTitle,
            description: formattedDescription,
            price: formattedPrice,
        });

        const formattedIngredients = ingredients.map((ingredient) => ({
            dish_id: dish_id[0],
            name: ingredient,
        }))
        
        await knex("dishIngredients").insert(formattedIngredients);

        return response.status(201).json({
            message: 'Refeição criada com sucesso.'
        });
    };

    async udpate(request, response) {
        const { id } = request.params;
        const { newTitle, newDescription, newIngredients ,newPrice } = request.body;

        const emptyField = !newTitle || !newDescription;
        verifyData.dishInfoExists(emptyField);

        const emptyIngredients = newIngredients.length <= 0 || !newIngredients.some(Boolean);
        verifyData.ingredientsInfoExists(emptyIngredients);

        const emptyPrice = newPrice <= 0 || isNaN(newPrice);
        verifyData.priceIsEmptyAndNotANumber(emptyPrice);

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
        const dishes = await knex("dish").select("id", "title", "description", "price");

        const ingredients = await knex("dishIngredients").select("id", "dish_id", "name");

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

        const ingredients = await knex("dishIngredients").where({ dish_id: id });

        const dishWithIngredients = {
            ...dish,
            ingredients
        };

        return response.status(200).json(dishWithIngredients)
    };
};

module.exports = DishController;