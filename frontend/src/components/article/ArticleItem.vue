<template>
  <div class="article-item">
    <!-- router-link será dividido entre imagem e as informações do artigo -->
    <router-link :to="{ name: 'ArticleById', params: { id: article.id } }">
      <!-- Se o dispositivo for muito pequeno a imagem some -->
      <!-- d-sm-block - Exibe em forma de bloco do small pra cima  -->
      <div class="article-item-image d-none d-sm-block">
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          alt="Article image"
          height="150"
          width="150"
        />
        <img
          v-else
          src="@/assets/article.png"
          width="150"
          height="150"
          alt="Article default image"
        />
        <div class="article-item-info">
          <h2>{{ article.name }}</h2>
          <p>{{ article.description }}</p>
          <span class="article-item-author">
            <strong>Autor: </strong> {{ article.author }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: ["article"], //Passando o artigo como parâmetro para o componente ArticleItem
};
</script>

<style>
</style>