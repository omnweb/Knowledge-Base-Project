<template>
  <header class="header"></header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.header {
  grid-area: header;
  background-image: linear-gradient(to right, #1e409a, #49a7c1);
  display: flex;
  justify-content: center; /* Justificando o conteúdo na linha */
  align-items: center; /* Centralizando a coluna */
}
</style>