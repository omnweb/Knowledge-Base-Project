<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/"> {{ title }} </router-link>
    </h1>
    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
// Importando componente dropdown
import UserDropdown from "./UserDropdown";
export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean,
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible ? "fa-times" : "fa-bars";
    },
  },
  methods: {
    // função que será chamada quando clicado no ícone <
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>



<style>
.header {
  grid-area: header;
  background: linear-gradient(
    to right,
    #0f2027,
    #203a43,
    #2c5364
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: flex;
  justify-content: center; /*Justificando o conteúdo na linha */
  align-items: center; /*Centralizando a coluna*/
}
.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}
.title a {
  color: #fff;
  text-decoration: none;
}
.title a:hover {
  color: #fff;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>