import axios from 'axios'

//Interceptando eventos de sucessos e erros de uma forma global 
//para tratar requisições com axios

const success = res => res //recebe a resposta e retorna a mesma resposta

const error = err => {
    if (401 === err.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}

//Cadastrando as funcões
axios.interceptors.response.use(success, error)