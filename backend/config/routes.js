// const { get } = require("mongoose")
const admin = require('./admin')

// Criando uma função que vai exportar as rotas
module.exports = app => {
    //Definindo as rotas da aplicação

    // Rotas para o sistema de login
    app.post('/signup', app.api.user.save) //salvar usuário
    app.post('/signin', app.api.auth.signin) // autenticar usuário
    app.post('/validateToken', app.api.auth.validateToken) // validar token


    // Mapeando post
    app.route('/users')
        // cai aqui qdo a requisição na url users for do tipo post
        .all(app.config.passport.authenticate()) //Se der problema na autenticação ele não deixa chamar os métodos debaixo 
        .post(app.api.user.save) // Forma de acessar usando consign
        .get(admin(app.api.user.get)) // Acessando método get


    // O método inserir e alterar são o mesmo, mas atuam em urls diferentes
    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById)) // Acrescentando em rotas a pesquisa por id
        .delete(admin(app.api.user.remove))

    // Rotas para os métodos get e save de categories
    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    // Cuidado com a ordem!, tem que vir antes de ('/categories/:id')
    // Rotas do método getTree de categories
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    // Retornar os metodos Categorias
    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    // Métodos de artigos
    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    // Rotas para o método de busca de filhos de category
    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    // Rota para stat
    app.route('/stats')
        //.all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}




// // Forma padrão de vincular a url users pra chamar o metodo save
// // sem usar consign
// const user = require('../api/user')
// module.exports = app => {
//     app.route('/users')
//         .post(user.save) 
// }