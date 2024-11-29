const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

const knex = require('../database');

class DishController {
    async create(request, response) {
        const { title, description, ingredients, price} = request.body;

        const emptyField = !title || !description;
        verifyData.dishInfoExists(emptyField);

        const emptyIngredients = ingredients.length <= 0 || !ingredients.some(Boolean);
        verifyData.ingredientsInfoExists(emptyIngredients);

        const emptyPrice = price <= 0 || isNaN(price);
        verifyData.priceIsEmptyAndNotANumber(emptyPrice);

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

        return response.json({
            message: 'Refeição criada com sucesso.'
        });
    }
}

module.exports = DishController;