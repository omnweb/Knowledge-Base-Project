// Função que retorna um meddleware informando se o usuário é ou não administrador
module.exports = middleware => {
    return (req, res, next) => {
        if (req.user.admin) {
            middleware(req, res, next) //Caso o usuário seja admin
        } else {
            //Caso não seja
            res.status(402).send('Usuário não é administrador')
        }
    }
}