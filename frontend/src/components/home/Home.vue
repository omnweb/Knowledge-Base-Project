<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
    <!-- Div que envolve as estatísticas -->
    <div class="stats">
      <Stat
        title="Categorias"
        :value="stat.categories"
        icon="fa fa-sitemap"
        color="#d54d50"
      />
      <Stat
        title="Artigos"
        :value="stat.articles"
        icon="fa fa-newspaper-o"
        color="#3bc480"
      />
      <Stat
        title="Usuários"
        :value="stat.users"
        icon="fa fa-user-circle"
        color="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stat }, // Componentes usados devem ser declarados
  //Estado obtido através da requisição
  data: function () {
    return {
      stat: {}, //Inicia vazio, mas após o retorno da req conterá usuários, artigos e categorias
    };
  },
  methods: {
    //Fzdo a req no backend
    getStats() {
      axios
        .get(`${baseApiUrl}/stats`) // Recebendo dados do backend
        .then((res) => (this.stat = res.data)); // setando dentro de data.stat
    },
  },
  //Recarregando stats toda vez que o valor for mutado
  mounted() {
    this.getStats(); // Qdo sofrer alteração ele chama o getStats que seta dentro de data.stat as alterações
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>