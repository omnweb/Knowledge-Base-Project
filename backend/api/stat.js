// Criando serviço que de tempos em tempos ou quando houver atualizações
// acessa o banco e salva em um json as statísticas do sistema para atualizar o frontend

module.exports = app => {
    //criando o model
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    // Método que vai obter do mongoDB a última estatística
    const get = (req, res) => {
        //Buscando informações no mongoose
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 } }) // Pega a última estatística gravada
            .then(stat => {
                //Definindo um valor stático
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                }
                //Retorna ou stat ou o valor stático
                res.json(stat || defaultStat)
            }) // Mongose tbm funciona com promise, retornando resultado para o front
    }
    return { Stat, get }
}