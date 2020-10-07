const mongoose = require('mongoose') // Inportando mongoose

// Criando uma conexão com o mongo db
mongoose.connect('mongodb://localhost:knowledge_stats', { useNewUrlParser: true, useUnifiedTopology: true, }) // Acrescentei useUnifiedTopology: true para corrigir um warning
    .catch(e => {
        //Caso tenha erro de conexão cai aqui
        const msg = 'Erro de conexão com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')// Criando mensagem de erro para ser exibida pelo node no terminal
    })