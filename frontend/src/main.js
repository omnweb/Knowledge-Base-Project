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
require('axios').defaults.headers.common['Autorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5ldG8gTWF0aWF6aSIsImVtYWlsIjoibmV0b21hdGlhemlAaG90bWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjAzNzQyNTM5LCJleHAiOjE2MDQwMDE3Mzl9.AB1OzJrRZ4OpJaiGoCUSnAT7Ig-c-AhG_EMc7MoZrcg'

new Vue({
  store, // Compartilhando entre os componentes
  router, // Compartilhando rotas
  render: h => h(App)
}).$mount('#app')