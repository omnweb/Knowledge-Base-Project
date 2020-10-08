<template>
  <aide class="menu"></aide>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style>
.menu {
  grid-area: menu;
  background-image: linear-gradient(to right, #232526, #414345);

  /* Menu vertical */
  display: flex;
  font-display: column; /* Mudando a orientação de linha para coluna */
  flex-wrap: wrap; /* Para permitir quebra de linha */
}
</style>