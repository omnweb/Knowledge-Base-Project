const { authSecret } = require('../.env') // para ler o token
const passport = require('passport') // Auxilia na autenticação
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt // Estratégia e opção para extrair o token da requisição

module.exports = app => {
    const params = {
        // Passando o segredo para secretOrKey
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // jwtFromRequest recebe o cabeçalho da requisição
    }

    // strategy recebe as instruções chamando uma callback
    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id }) //pegando o id no payload
            .first()
            //Recebe o usuário e chama a função done
            .then(user => done(null, user ? { ...payload } : false)) // null é o parâmetro dz que n tem erro,  caso o usuário esteja setado ele disponibiliza os dados da sessão
            .catch(err => done(err, false)) // False que não deu certo
    })

    //chamando o passport e passando a estratégia
    passport.use(strategy)

    // Retonando o método de autenticação que vai filtrar requisições
    return {
        authenticate: () => passport.authenticate('jwt', { session: false }) // usando a estratégia jwt e não usando nada para sessão
    }
}