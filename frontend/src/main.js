//Importando font-awesome
import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

//importando Bootstrap e arquivos vinculados
import './config/bootstrap'

//Importando a store
import store from './config/store' // Importando instância de store
import router from './config/router' // Importando instância de router


Vue.config.productionTip = false

new Vue({
  store, // Compartilhando entre os componentes
  router, // Compartilhando rotas
  render: h => h(App)
}).$mount('#app')