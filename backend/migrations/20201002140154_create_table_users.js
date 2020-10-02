// Migrations servem para controlar a evolução do banco de dados 
// Elas serão lidas e criarão sempre a versão mais novas das diretivas definidas em up e dow
//
exports.up = function(knex) {
    // users é o nome da tb que será criada
  return knex.schema.createTable('users', table => {
      // Dentro de table ficarão as colunas
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)    
  })
};

// No up foi colocado a insersão e no down a exclusão 
exports.down = function(knex) {
  return knex.shema.dropTable('users')
};
