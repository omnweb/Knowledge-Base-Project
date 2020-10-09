<template>
  <header class="header">
    <div :class="['container', { change: toggled }]" @click="myFunction">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
  data() {
    return {
      toggled: false,
    };
  },
  methods: {
    // função que será chamada quando clicado no ícone <
    myFunction() {
      this.toggled = !this.toggled;
    },
  },
};
</script>



<style>
.header {
  grid-area: header;
  background-image: linear-gradient(to right, #1e409a, #49a7c1);
  display: flex;
  justify-content: start; /*Justificando o conteúdo na linha */
  align-items: center; /*Centralizando a coluna*/
}
.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}
title.a {
  color: #fff;
  text-decoration: none;
}
/*toggleMenu*/
.container {
  display: inline-block;
  cursor: pointer;
  padding: 15px;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #49a7c1;
  margin: 6px 0;
  transition: 0.4s;
}

/* Rotate first bar */
.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

/* Fade out the second bar */
.change .bar2 {
  opacity: 0;
}

/* Rotate last bar */
.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
</style>