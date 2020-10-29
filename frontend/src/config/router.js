import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'

import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'

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
    component: AdminPages
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
}]

// Instanciando o VueRouter

//Deve ser importado dentro de main
export default new VueRouter({
    mode: 'history', //History deixa a url mais amigável
    routes: routes // Add as rotas criadas acima
})



