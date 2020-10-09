<template>
  <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
// Estabelecendo a conversa com header para abrir e fechar esse componente
import { mapState } from "vuex"; // Responsável por mapear um atributo da store dentro desse componente

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"]), // Mapeando apenas o atributo isMenuVisible, mas pode ser passado um objeto
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