<template>
  <div class="article-by-id">
    <PageTitle
      icon="fa fa-newspaper-o"
      :main="article.name"
      :sub="article.description"
    />

    <!-- Usando diretiva v-html para exibir o artigo -->
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import PageTitle from "../template/PageTitle";
export default {
  name: "ArticleById",
  components: { PageTitle },
  data: function () {
    return {
      article: {},
    };
  },
  mounted() {
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`;
    axios.get(url).then((res) => (this.article = res.data)); // Já vem em formato html
  },
};
</script>

<style>
.article-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25;
}

/* Limitando o tamanho da imagem a ser exibido */
.article-content img {
  max-width: 100%;
}

/* Formatando a exibição do campo código */

.article-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #e1e1e1;
}

/* Deixando o último elemento sem margin na parte de baixo */
.article-content :last-child {
  margin-bottom: 0;
}
</style>