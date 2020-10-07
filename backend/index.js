// Importando o express encadeando a chamada de funçao
const app = require('express')()

// Importando consign que ajudará na ligação e dependência entre os arquivos
const consign = require('consign')

// Importando instância do knex em db.js
const db = require('./config/db')

// Importando Mongoose
const mongoose = require('mongoose')

//Carregando o arquivo mongod
require('./config/mongodb')



// Adicionando knex dentro de app 
app.db = db

//Adicionando mongoose dentro de app
app.mongoose = mongoose

//Chamando a função consign e encadeando
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js') // Carregando validation
    .then('./api') // Carregando a api
    .then('./config/routes.js') //Quando ler as rotas a api já estará carregada
    .into(app) // Injeta o express em cada dependêcia criad


//Bachend escutando na porta 3000
app.listen(3000, () => {
    console.log('Backend executando...')
})

