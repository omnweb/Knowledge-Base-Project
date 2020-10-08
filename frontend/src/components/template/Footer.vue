<template>
  <footer class="footer">
    <span>Copyright <strong>OMN Web</strong> © 2020</span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center; /* alinha ao centro da coluna*/
  justify-content: flex-end; /* Alinhando no final da linha */
  padding-right: 10px; /* Para o texto do footer não colar na borda */
}
</style>