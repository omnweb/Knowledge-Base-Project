<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="200" alt="logotipo" />
      <hr />
      <div class="auth-title">{{ showSignup ? "Cadastro" : "Login" }}</div>
      <input
        v-if="showSignup"
        v-model="user.name"
        placeholder="nome"
        type="text"
      />
      <input v-model="user.email" type="text" placeholder="email" />
      <input v-model="user.password" type="password" placeholder="Senha" />
      <input
        v-if="showSignup"
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirme a senha"
      />
      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Entrar</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function () {
    return {
      //Criar um atributo que serve como flag para alternar entre as telas cadastro e login
      showSignup: false, //Se true mostra o login, se false o signup
      user: {}, // Armazena dados do usuário (Sessão)
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user) //Passando o usuário
        .then((res) => {
          this.$store.commit("setUser", resp.data); // Salvando na store
          localStorage.setItem(userKey, json.stringify(res.data)); // Pegando o objeto recebebido da resposta da requisição e salvando em localStorage
          this.router.push({ path: "/" }); // Navegando para a raiz da aplicação após o login ser efetuado
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350;
  padding: 35px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>