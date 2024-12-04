exports.up = function(knex) {
  return knex.schema.createTable("drink", table => {
    table.increments("id");
    table.text("image").defaultTo(null);
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.decimal("price", 8, 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("drink");
};
