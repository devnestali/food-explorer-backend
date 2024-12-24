exports.up = function(knex) {
  return knex.schema.createTable("dish", (table) => {
    table.increments("id");
    table.text("image").defaultTo(null);
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.decimal("price", 8, 2).notNullable();
    table.string("type").defaultTo("dish");
    table.check("type = 'dish'");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("dish");
};
