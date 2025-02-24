exports.up = function(knex) {
    return knex.schema
      // Create users table
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      // Create tasks table
      .createTable('tasks', function(table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.text('description');
        table.boolean('is_complete').defaultTo(false);
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('tasks')
      .dropTable('users');
  };