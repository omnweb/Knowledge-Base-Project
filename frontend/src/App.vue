<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible }">
    <Header
      title="Base de Conhecimento"
      :hideToggle="true"
      :hideUserDropdpwn="false"
    />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script>
//Importando mapState do vuex
import { mapState } from "vuex";

// Importando componentes principais do app
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer },
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
/* Estilos para o componente App */
* {
  font-family: "Lato", sans-serif;
}
body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased; /* Serve para deixar a renderização da fonte mais bonita */
  -moz-osx-font-smoothing: grayscale;

  /* Unidade de tamanho 100vh = toda a tela */
  height: 100vh;

  /* Usando Css Grid para os componentes com grid-area */
  display: grid;
  grid-template-rows: 60px 1fr 40px; /* Conterá 3 linhas, uma 60px que será o menu, 40px o footer e 1fr é o fragmento de tela variável que servirá para o conteúdo */
  grid-template-columns: 300px 1fr; /* A col de 300 px é para o menu lateral e 1 fr para o conteúdo */

  /* DEFININDO COMO SERÃO EXIBIDOS OS COMPONENTES COM grid-template-areas  */
  grid-template-areas:
    "header header" /* Header ocupando a primeira linha e as duas colunas */
    "menu content" /* Na segunda linha o menu e ao lado direito o content ocupando a maior parte */
    "menu footer" /* Na última linha o meni e ocupando a maior parte o rodapé */;
}
#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>