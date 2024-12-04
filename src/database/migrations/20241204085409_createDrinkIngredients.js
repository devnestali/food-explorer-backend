exports.up = function(knex) {
    return knex.schema.createTable("drinkIngredients", table => {
        table.increments("id");
        table.integer("drink_id").references("id").inTable("drink").onDelete("CASCADE");
        table.text("name");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("drinkIngredients");
};
