exports.up = function (knex) {
return knex.schema.createTable('users', (table) => {    
        table.increments('id');
        table.text('username').notNullable();
        table.text('email').notNullable();
        table.text('password').notNullable();
        table.enu('role', ['admin', 'user']).defaultTo('user');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
    
