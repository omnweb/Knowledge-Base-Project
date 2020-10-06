const { authSecret } = require('../.env') // Importando .env com a chave
const jwt = require('jwt-simple') //
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    //Função de login
    const signin = async (rec, res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe usuário e senha!')
        }
        const user = await app.db('users')
            .where({email: req.body.email}) // Comparando email do banco com o da requisição
            .first()
        if(!user) return res.status(400).send('Usuário não encontrado')

        //A senha como é criptografada é comparada da seguinte maneira:
        const isMatch = bcrypt.compareSync(req.body.password, user.password) // Pega a senha digitada passa no bcrypt e compara com a senha do usuário
        if(!isMatch) return res.status(401)/send('Email/Senha não conferem')

        // Gerando um tokem que será o tempo máximo que o usuário permanecerá logado
        const now = Math.floor(Date.now()/ 1000) // Recebendo a data atual em segundos
        
        // Conteúdo do token
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin, // Se o usuário é admin ou não
            iat: now, //Data de geração do token
            exp: now + (60 * 60 * 24 * 3) // 60 s * 60m = 1h * 24 = 1d * 3 = 3d
        }

        //Mandando a resp
        res.json({
            ...payload,
            //criptografando o token para que somente o servidor possa validar
            token: jwt.encode(payload, authSecret) // Qqr nova requisição precisará ter um cabeçalho de autorização
        })
    }
}