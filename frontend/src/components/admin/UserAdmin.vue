<template>
  <div class="user-admin">
    <h1>Usuário Componete</h1>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global"; // Constnte com a url do backend
import axios from "axios"; //biblioteca que faz as requisições

export default {
  name: "UserAdmin",
  data: function () {
    return {
      //Modo altera o botão do formulário
      // Se tiver save e possuir id o método chama o put
      //Se tiver o save e sem id ele chama o post e
      // Se p botão save tiver sumido e aparecer o botão de remover ele chama o delete
      mode: "save", // vai trocar entre o módulo de exclusão e o modo save
      user: {}, // Inicia vazio, mas recebe as operações a serem realizadas no banco
      users: [], // Será renderizado uma tabela com os usuários
    };
  },
  methods: {
    //Carregar lista de usuários do backend
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data;
        console.log(this.users);
      });
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>