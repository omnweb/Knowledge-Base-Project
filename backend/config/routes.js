// Criando uma função que vai exportar as rotas
module.exports = app => {
    //Definindo as rotas da aplicação

    // Mapeando post
    app.route('/users')
        // cai aqui qdo a requisição na url users for do tipo post
        .post(app.api.user.save) // Forma de acessar usando consign
        .get(app.api.user.get) // Acessando método get
        

    // O método inserir e alterar são o mesmo, mas atuam em urls diferentes
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById) // Acrescentando em rotas a pesquisa por id

    // Rotas para os métodos get e save de categories
    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)

     // Retornar os metodos de excluir 
     app.route('/categories/:id')
        .get(app.api.category.getById) 
        .put(app.api.category.save)
        .delete(app.api.category.remove)
        
}
    

   

// // Forma padrão de vincular a url users pra chamar o metodo save
// // sem usar consign
// const user = require('../api/user')
// module.exports = app => {
//     app.route('/users')
//         .post(user.save) 
// }