const queries = require('./queries') //Importando arquivo de consultas específicas

// Exportando módulo e importando as validações
module.exports = app => {
    const { existsOrError } = app.api.validation

    // Método salvar e Atualizar
    const save = (req, res) => {
        const article = { ...req.body }
        // verificando se possui id
        if(req.params.id) article.id = req.params.id

        // Validações , se a descrição está presente, se tem categoria, conteúdo...
        try {
            existsOrError(article.name, 'Nome não informado.') // Validando nome do artigo
            existsOrError(article.description, 'Descrião não informado.') // Validando descrição
            existsOrError(article.categoryId, 'Categoria não informada') // Validando categoria
            existsOrError(article.userId, 'Autor não informado') // Validando nome do autor
            existsOrError(article.content, 'COnteúdo não informado') // Validando conteúdo
        } catch(msg) {
            // Retornando mensagem de erro
            res.status(400).send(msg)
        }
        // Update
        if(article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    //remove
    const remove = async (req, res) => {
        try {
            // Veridicando se a exlusão teve resultado
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del() // Verificando se o id do banco é o mesmo da requisição e .del() no final para excluir
            // Caso não tenha nenhuma linha afetada gera o erro abaixo
            try {
                existsOrError(rowsDeleted, 'Artigo não encontrado')
            } catch(msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    // FUNÇÃO DE PAGINAÇÃO -> Replicar em usuário e em categorias
    const limit = 10
    const get = async (req, res) => {
        
        const page = req.query.page || 1// Recebe qual página será exibida, caso não recebe exibe a página 1
        const result = await app.db('articles').count('id').first() // Caount para saber qtos registros tem na base de dados
        const count = parseInt(result.count)
        
        // Fazensdo o select
        app.db('articles')
        .select('id', 'name', 'description')
        .limit(limit).offset(page * limit - limit) //Pulando a consulta no banco de 10 em 10, ex: page é 1 e limit é 10 -> 1*10 = 10 -10 = 0. 2*10 = 20 -10 = 10... 
        .then(articles => res.json({ data: articles, count, limit })) // Retornando data com todos os artigos, o count e o limit
        .catch(err => res.status(500).send(err))
    }
    //Consulta por id
    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString() // Artigo vem no formato binário, convertendo para string
                return res.json(article)
             })
    .catch(err => res.status(500).send(err))
    }

    //Busca todos os filhos de uma categoria
    const getByCategory = async (req, res) => {
        const categoryId = req.params.id // Recebendo o id da categoria
        //Espera receber o parâmetro page contido na query
        const page = req.query.page || 1        
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId) // Fazendo uma consulta crua = raw -> o sql fica dentro de queries, que será obtido pelo knex

        // Extraindo as categorias
        const ids = categories.rows.map(c => c.id) // Armazenando em ids um array de id
        
        // fazendo a consulta
        app.db({a: 'articles', u: 'users'}) //Junção de tabelas no knex
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name'}) // Renomeando nome de usuário para autor
            .limit(limit).offset(page * limit - limit) // Colocando limite de páginas pré determinado na variável
            .whereRaw('?? = ??', ['u.id', 'a.userId']) // Igualando o id das tabelas
            .whereIn('categoryId', ids) // trazendo o ids que contenham o category id que veio na req
            .orderBy('a.id', 'desc') // Ordenando por id de forma decrescente
            .then(articles => res.json(articles)) //Mandando os arquivos como json para o backend
            .catch(err => res.status(500).send(err))
    }

    //Retornando as funções
    return { save, remove, get, getById, getByCategory }
}
