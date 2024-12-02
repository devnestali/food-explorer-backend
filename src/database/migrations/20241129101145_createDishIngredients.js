exports.up = function(knex) {
    return knex.schema.createTable("dishIngredients", (table) => {
      table.increments("id");
      table.integer("dish_id").references("id").inTable("dish").onDelete("CASCADE");
      table.text("name");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("dishIngredients");
  };
  