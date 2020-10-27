import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, { iconPack: 'fontawesome', duration: 3000 }) // Substituindo a biblioteca padrão de icones pelo fontawesome

//Registrando uma mensagem padrão  de sucesso no toasted 
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso' : payload.msg,
    { type: 'success', icon: 'check' } // Escolhendo a cor da mensagem e o ícone
)

// Mensagem padrão de erro no toasted
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops... Erro inesperado.' : payload.msg,
    { type: 'error', icon: 'times' }
)