// Criando uma função que vai exportar as rotas
module.exports = app => {
    //Definindo as rotas da aplicação

    // Mapeando post
    app.route('/users')
        // cai aqui qdo a requisição na url users for do tipo post
        .post(app.api.user.save) // Forma de acessar usando consign
}

// // Forma padrão de vincular a url users pra chamar o metodo save
// // sem usar consign
// const user = require('../api/user')
// module.exports = app => {
//     app.route('/users')
//         .post(user.save) 
// }