//Criando arquivo que contém um agendador de tarefas
// Será responsável por olhar os bancos em busca de alterações

const schedule = require('node-schedule') //importando

module.exports = app => {
    //Apontando a pasta do consign, consequentemente tudo que tem lá será executado
    schedule.scheduleJob('*/1 * * * *', async function () { // Passando padrão de 1 em 1 minuto
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        //Acessando o modelo stat
        const { Stat } = app.api.stat
        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt': -1 } }) // Pegando a última estatística do mongo db

        // Criando uma nova estatística
        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.coun,
            createdAt: new Date()
        })

        //Agora usando a ultima estatística compara se houve mundanças
        // Se houve persiste no banco, senão espera a próxima chamada.  
        const changeUsers = !lastStat || status.users !== lastStat.users // Se a ultima estatística não estiver setada ou se o valor for diferente é pq o usuário mudou
        const changeCategories = !lastStat || status.categories !== lastStat.categories
        const changeArticles = !lastStat || status.articles !== lastStat.articles

        //Se mudar a estatística de qualquer um dos abaixo
        if (changeUsers || changeCategories || changeArticles) {
            //habilita a inserção de um novo registro
            stat.save().then(() => console.log('[Stats] Estatísticas Atualizadas!'))
        }
    })
}