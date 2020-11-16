//Usando Bcrypt para criptografar a senha do usuário
const bcrypt = require('bcrypt-nodejs')

// Criando uma função que exporta o método save
module.exports = app => {
    // importando métodos de validação
    const { existsOrError, notExistsOrError, equalOrError } = app.api.validation

    // Função responsável por criptografar a senha
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10) // Faz com que uma senha gerada, mesmo que idêntica" nunca seja igual a outra gerada em um novo momento
        return bcrypt.hashSync(password, salt) // Retornando o hash gerado a partir de passwpord juntament com o 'sal' que muda o tempera a cada salvamento
    }

    // Função para inserir e alterar usuários no banco de dados
    // Marcada como async
    const save = async (req, res) => {
        const user = { ...req.body } // Clonando corpo da requisição usando spread
        //Verificando se o id está setado user.id = id da requisição
        if (req.params.id) user.id = req.params.id

        // Fazendo com que o usuário inicial receba o parâmetro admin como falso
        if (!req.originalUrl.startsWith('/users')) user.admin = false

        //Condição que se não está logado nem é administrador
        if (!req.user || !req.user.admin) user.admin = false

        //validações
        try {
            existsOrError(user.name, 'Nome não informado') // Mensagem caso o campo nome não esteja preenchifo
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            // Verificando se o usuário já está cadastrado, usando instância do knex em db
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first() //Pega só o primeiro registro

            // Se o id não estiver setado cai aqui
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado') // fução notExists retorna um erro se não houver o registro
            }

        }
        catch (msg) {
            return res.status(400).send(msg) // Retornando o status 400 pois foi um erro do lado do cliente
        }

        user.password = encryptPassword(user.password) // Criptografando a senha
        delete user.confirmPassword // Deletando pois não será inserido no banco

        //UPDATE
        //Verificando id
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })  //Update no usuário onde o id = user id
                .whereNull('deletedAt') // Não vai deixar atualizar um usuário que esteja deletado virtualmente
                .then(_ => res.status(204).send()) // Status 204 quer dizer que deu certo
                .catch(err => res.status(500).send(err)) // 500 erro causando no lado do servidor
        } else {
            // Caso o id não esteja setado
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const getUsers = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .andWhere('admin', true)
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    // Busca os usuários do sistema
    // Implantar a paginação que estará presente em artigos
    const limit = 5
    const get = async (req, res) => {

        const page = req.query.page || 1
        const result = await app.db('users').whereNull('deletedAt').count('id').first()
        const count = parseInt(result.count)



        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .limit(limit).offset(page * limit - limit)
            .whereNull('deletedAt') // Excluindo usuários deletados da consulta
            .then(users => res.json({ data: users, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // Desafio, criando uma função que busca um usuário por id
    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    // Função de remover virtualmente o usuário
    const remove = async (req, res) => {
        //Não excluirá usuários com artigos associados
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id }) // Procurando todos os artigos cujo id seja igual ao da requisição
            notExistsOrError(articles, 'Usuário possui artigos.')
            // Pegando a qtd de linhas atualizadas
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id }) // Se voltar 1 atualizou o campo e se fr 0 não encontrou o usuário pelo id
            existsOrError(rowsUpdated, 'Usuário não foi encontrado')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    // Retornarndo um objeto com todas as funções deste módulo usuário
    return { save, get, getUsers, getById, remove }
}