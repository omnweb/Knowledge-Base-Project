// Importando o express encadeando a chamada de funçao
const app = require('express')()

// Importando consign que ajudará na ligação e dependência entre os arquivos
const consign = require('consign')

//Chamando a função consign e encadeando
consign()
    .then('./config/middlewares.js')
    .then('/api') // Carregando a api
    .then('./config/routes.js') //Quando ler as rotas a api já estará carregada
    .into(app) // Injeta o express em cada dependêcia criad


//Bachend escutando na porta 3000
app.listen(3000, () => {
    console.log('Backend executando...')
})

