// Criando uma função que exporta o método save
module.exports = app => {
    const save = (req, res) => {
        res.send('user save')
    }

    // Retornarndo um objeto com todas as funções deste módulo usuário
    return { save }
}