// Importando bodyparaser para que várias extensões de arquivo sejam interpretadas
const bodyParser = require('body-parser')

// Importando Cors que vai interligar Postgres com o MongoDB
const cors = require('cors')

// Consign vai ajudar a fazer as dependências dentro da aplicação (app)
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}
