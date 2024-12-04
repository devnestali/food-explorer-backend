const knex = require('../database');

const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

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
};

module.exports = DrinkController;