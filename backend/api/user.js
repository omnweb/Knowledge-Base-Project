//Usando Bcrypt para criptografar a senha do usuário
const bcrypt = require('bcrypt-nodejs')

// Criando uma função que exporta o método save
module.exports = app => {
    // importando métodos de validação
    const  { existsOrError, notExistsOrError, equalOrError } = app.api.validation

    // Função responsável por criptografar a senha
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10) // Faz com que uma senha gerada, mesmo que idêntica" nunca seja igual a outra gerada em um novo momento
        return bcrypt.hashSync(password, salt) // Retornando o hash gerado a partir de passwpord juntament com o 'sal' que muda o tempera a cada salvamento
    }

    // Função para inserir e alterar usuários no banco de dados
    // Marcada como async
    const save = async (req, res) => {
        const user = {...req.body} // Clonando corpo da requisição usando spread
        //Verificando se o id está setado user.id = id da requisição
        if(req.params.id) user.id = req.params.id

        //validações
        try{
            existsOrError(user.name, 'Nome não informado') // Mensagem caso o campo nome não esteja preenchifo
            existsOrError(user.email, 'E-mail não informado') 
            existsOrError(user.password, 'Senha não informada') 
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida') 
            equalOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            // Verificando se o usuário já está cadastrado, usando instância do knex em db
            const userFromDB = await app.db('users')
                .where({email: user.email}).first() //Pega só o primeiro registro

                // Se o id não estiver setado cai aqui
                if(!user.id){
                    notExistsOrError(userFromDB, 'Usuário já cadastrado') // fução notExists retorna um erro se não houver o registro
                }
            
        }
        catch(msg){
            return res.status(400).send(msg) // Retornando o status 400 pois foi um erro do lado do cliente
        }

        user.password = encryptPassword(user.password) // Criptografando a senha
        delete user.confirmPassword // Deletando pois não será inserido no banco

        //UPDATE
        //Verificando id
        if(user.id){
            app.db('users')
                .update(user)
                .where({id: user.id})  //Update no usuário onde o id = user id
                .then(_=> res.status(204).send()) // Status 204 quer dizer que deu certo
                .catch(err => res.status(500).send(err)) // 500 erro causando no lado do servidor
        } else {
            // Caso o id não esteja setado
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Busca os usuários do sistema
    // Implantar a paginação que estará presente em artigos
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin' )
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    // Retornarndo um objeto com todas as funções deste módulo usuário
    return { save, get }
}