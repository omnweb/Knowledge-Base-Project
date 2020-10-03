
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('description', 1000).notNull() // Aumentando o padrão que é de 255 caracteres
      table.string('imageUrl', 1000)
      table.binary('content').notNull() // Campo que armazena o conteúdo do artigo
      table.integer('userId').references('id').inTable('users').notNull() // Foreign key users
      table.integer('categoryId').references('id').inTable('categories').notNull() // Foreign key categories

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
};
