<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
    <Header
      title="Base de Conhecimento"
      :hideToggle="!user"
      :hideUserDropdown="!user"
    />
    <Menu v-if="user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
//Importando mapState do vuex
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import Loading from "@/components/template/Loading";

// Importando componentes principais do app
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  computed: mapState(["isMenuVisible", "user"]),
  data: function () {
    return {
      validatingToken: true, // ValidateToken começa como true
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;
      // Pegando o json em localStorage
      const json = localStorage.getItem(userKey);
      //Se for nulo mantém, seão converte para os dados do usuário
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      //  Se chegar aqui é pq o userData está setado
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      //Se o usuário for validado ele é setado da store
      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }
      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
  },
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