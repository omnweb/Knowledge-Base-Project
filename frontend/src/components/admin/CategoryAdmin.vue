<template>
  <div class="category-admin">
    <h1>Categoria Componente</h1>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  name: "CategoryAdmin",
  data: function () {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "parentId", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
};
</script>

<style>
</style>