const { table } = require("../config/db");

exports.up = function(knex) {
  return knex.schema.createTable('categories', table => {
      table.increments('id').primary()
      table.toString('name').notNull()
      table.integer('parentId').references('id').inTable('categories') //Auto relacionamento, uma coluna que se relaciona com a própria tabela
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories')
};
