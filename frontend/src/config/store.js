// Criando uma área de armazenamento com VueX que será compartilhada entre os componentes
// Quando a store é modificada o componente q tem a referência da modificação é notificado e renderizado novamente
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

// Passando vuex para o vue
Vue.use(Vuex)

export default new Vuex.Store({
    //Criando as funções que manipularão os dados
    state: {
        isMenuVisible: false, //Deixando o menu visível
        user: null
    },
    mutations: {
        // responsavel pelas mudanças de estado
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return
            }
            // se isVisible for passado, ele usa a informação para dizer se está visível ou não, senão alterna entre visível e invisível 
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible // Se não estiver setado alterna entre visível e invisível
            } else {
                state.isMenuVisible = isVisible // Se estiver setado toma o que vier como verdade
            }
            // console.log('toggleMenu' + state.isMenuVisible)
        },

        //Recebe o estado e o usuário que será setado
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    },
}) 
