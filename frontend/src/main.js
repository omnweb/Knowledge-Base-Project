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

// TEMPORÁRIO
require('axios').defaults.headers.common['Autorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6Ikpvw6NvIiwiZW1haWwiOiJqb2FvQGhvdG1haWwuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2MDM3MjQ4MDgsImV4cCI6MTYwMzk4NDAwOH0.EcaKVEOXD9ZyVgN-CdxrfDHpfC-GKupCIx48wPhMZFY'

new Vue({
  store, // Compartilhando entre os componentes
  router, // Compartilhando rotas
  render: h => h(App)
}).$mount('#app')