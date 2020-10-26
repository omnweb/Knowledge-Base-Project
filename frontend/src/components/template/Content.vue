<template>
  <div class="content">
    <router-view></router-view>
    <!-- Sempre que um compoente for selecionado ele vai renderizar aqui -->
  </div>
</template>

<script>
export default {
  // Tudo que está aqui será exportado para fora do componente
  name: "Content",
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>