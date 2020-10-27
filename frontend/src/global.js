// Estabelecendo a ligação entre o backend e o frontend

//Alterar o endereço com o do servidor em caso de produção

import Vue from 'vue'
export const baseApiUrl = 'http://localhost:3000'

export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError }