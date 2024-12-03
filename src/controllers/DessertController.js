const knex = require('../database');

const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

class DessertController {
    async create(request, response) {
        const { title, description, ingredients, price } = request.body;

        verifyData.infoExists(title, description);

        verifyData.ingredientsInfoExists(ingredients);

        verifyData.priceIsEmptyAndNotANumber(price);

        const formattedTitle = title.trim();
        const formattedDescription = description.trim().split(/\s+/). join(' ');
        const formattedPrice = price.toFixed(2);
        
        const dessert_id = await knex("dessert").insert({
            title: formattedTitle,
            description: formattedDescription,
            price: formattedPrice,
        });

        const formattedIngredients = ingredients.map((ingredient) => ({
            dessert_id: dessert_id[0],
            name: ingredient,
        }))

        await knex("dessertIngredients").insert(formattedIngredients);
        
        return response.status(201).json({
            message: 'Sobremesa criada com sucesso'
        });
    };
};

module.exports = DessertController;