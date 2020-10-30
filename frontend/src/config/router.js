import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'

import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

//Registrando o vueRouter dentro dou vue
Vue.use(VueRouter)

// Criando rotas para registrar as rotas do vueRouter

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
},
{
    name: 'ArticlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
},
{
    name: 'ArticleById',
    path: '/articles/:id',
    component: ArticleById
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

// Instanciando o VueRouter

//Deve ser importado dentro de main
const router = new VueRouter({
    mode: 'history', //History deixa a url mais amigável
    routes: routes // Add as rotas criadas acima
})

//Bloqueando o acesso das pelas pela url
router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey) // Pegando o json do localStorage

    if (to.matched.some(record => record.meta.requiresAdmin)) { // Se dentro do registro de rotas houver o parâmetro requiresAdmin da matched e entra no if
        const user = JSON.parse(json)// transformando o json em usuário

        // Verificando se o user está setado e se é administrador
        user && user.admin ? next() : next({ path: '/' }) // Senão for manda para raiz e lá valida o token e login
    } else {
        next()
    }
})

export default router


