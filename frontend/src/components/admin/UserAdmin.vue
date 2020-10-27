<template>
  <div class="user-admin">
    <b-table hover striped :intems="users"></b-table>
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
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: (value) => (value ? "sim" : "não"),
        },
        { key: "action", label: "Ações" },
      ],
    };
  },
  methods: {
    //Carregar lista de usuários do backend
    loadUsers() {
      axios
        .get(`${baseApiUrl}/users`) // Recebendo dados do backend
        .then((res) => (this.users = res.data)); // setando dentro de data.stat
      console.log(this.users);
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>