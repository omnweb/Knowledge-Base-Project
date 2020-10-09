//Importando font-awesome
import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

//importando Bootstrap e arquivos vinculados
import './config/bootstrap'

//Importando a store
import store from './config/store'

Vue.config.productionTip = false

new Vue({
  store, // Compartilhando entre os componentes
  render: h => h(App)
}).$mount('#app')