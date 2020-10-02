// Importando arquivo de configuração knexfile
const config = require('../knexfile.js')

// armazenando a Instancia knex e passando arquivo de configuração pra ele
const knex = require('knex')(config)

//Exportando a instância para que consiga ser acessada fora do módulo
module.exports = knex 