// Implementando soft delete
exports.up = function (knex, Promise) {
    //Alterar tabela criando uma coluna
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    //Alterar tabela excluindo uma coluna
    return knex.schema.alterTable('users', table => {
        table.dropColumn('deletedAt')
    })
};