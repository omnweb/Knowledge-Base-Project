module.exports = app => {
    // Validação do nome de usuário, se existir passa pela fução, senão gera um erro
    // Valida o preenchimento dos campos do formulario
    function existsOrError(value, msg) {
        // Verificando se o valor está setado
        if(!value) throw msg 

        //verificando se o valor é um array
        if(Array.isArray(value) && value.length === 0) throw msg // Se a consulta no banco retornar um array vazio, tomará como inexistente
    
        // Verificando espaços em branco
        if(typeof value === 'string' && !value.trim()) throw msg// Se retornar com espaços em branco não existe 
    }

    // Se ocorrer tudo bem, significa que tem algum problema
    // Função é o contrário da anterior
    // será usada para verificar se já existe no banco antes de salvar
    function notExistsOrError(value, msg){
        try{
            existsOrError(value, msg)
        } catch(msg){
            return
        }
        throw msg
    }

    // Validação para testar se os valores são iguais, caso diferentes dispara a msg
    //Será usado por ex para verificar se o email e senha são iguais aos salvos no banco
    function equalOrError(valueA, valueB, msg){
        if(valueA !== valueB) throw msg
    }
    return {existsOrError, notExistsOrError, equalOrError }
}