<template>
  <div class="content">Conteúdo</div>
</template>

<script>
export default {
  // Tudo que está aqui será exportado para fora do componente
  name: "content",
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>