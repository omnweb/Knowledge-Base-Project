<template>
  <div class="user-dropdown">
    <!-- Parte cliável -->
    <div class="user-button">
      <!-- Nome do usuário vai ser escondido cado muito longo  -->
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <!-- Imagem do usuário caso tenha conta no gravatar, senhão uma imagem padrão -->
        <Gravatar :email="user.email" alt="User" />
      </div>
      <!-- Ícone do dropdown -->
      <i class="fa fa-angle-down"></i>
    </div>
    <!-- Links do menu dropdown -->
    <div class="user-dropdown-content">
      <router-link to="/admin">
        <i class="fa fa-cogs"></i> Administração
      </router-link>
      <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userKey } from "@/global";
import Gravatar from "vue-gravatar";

export default {
  name: "UserDropdown",
  components: { Gravatar },
  computed: mapState(["user"]),
  methods: {
    logout() {
      localStorage.removeItem(userKey); // Remove o usuário do localStorage
      this.$store.commit("setUser", null); // Para esconder o menu... etc
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}
.user-button {
  display: flex;
  align-items: center;
  color: white;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}
/* Fazendo o menu dropdown aparecer */
/* Quando userDropdawn hover, aplica uma nova regra em .user-dropdown-content */
.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #2e2e2e;
  padding: 10px;
}
.user-dropdown-content a:hover {
  text-decoration: none;
  color: #2e2e2e;
  background-color: #ededed;
}
</style>