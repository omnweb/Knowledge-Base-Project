<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-sitemap" :main="category.name" sub="Categoria" />
    <ul>
      <li :key="article.id" v-for="article in articles">
        <ArticleItem :article="article" />
      </li>
    </ul>
    <div class="load-more">
      <button
        v-if="loadMore"
        class="btn btn-lg btn-outline-primary"
        @click="getArticles"
      >
        Carregar mais Artigos
      </button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import ArticleItem from "./ArticleItem";
export default {
  name: "ArticlesByCategory",
  components: { PageTitle, ArticleItem },
  data: function () {
    return {
      category: {}, //Id vem daqui
      articles: [],
      page: 1,
      loadMore: true,
    };
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`;
      axios(url).then((res) => (this.category = res.data));
    },
    getArticles() {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`; // Consulta entre duas tabelas de forma paginada
      axios(url).then((res) => {
        this.articles = this.articles.concat(res.data); // Acrescentando os artigos definidos com limit no backend, sem excluir os existentes ao cliacar em load more
        this.page++; // Pega a proxima página em cada requisição

        if (res.data.length === 0) this.loadMore = false; // Se não tiver mais dados no array o botão loadmore some
      });
    },
  },
  mounted() {
    //console.log(this.$route.params.id); através da rota pegando o parâmetro id
    this.category.id = this.$route.params.id;
    this.getCategory(); // Quando ocorrer o id já estará setado na url
    this.getArticles();
  },
};
</script>

<style>
.articles-by-category ul {
  padding: 0;
  list-style-type: none;
}
.articles-by-category .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
</style>