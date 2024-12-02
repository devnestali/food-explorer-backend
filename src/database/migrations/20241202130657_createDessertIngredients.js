exports.up = function(knex) {
  return knex.schema.createTable("dessertIngredients", table => {
    table.increments("id");
    table.integer("dessert_id").references("id").inTable("dessert").onDelete("CASCADE");
    table.text("name");
  })
};
exports.down = function(knex) {
  return knex.schema.dropTable("dessertIngredients");
};
