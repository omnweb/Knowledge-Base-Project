<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar..."
        v-model="treeFilter"
        class="filter-field"
      />
    </div>
    <!--
    treeData :faz com que a promisse seja resolvida antes de Carregar a página
    ref="tree": é usado para referenciar a árvore dentro dos métodos
    -->
    <Tree
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
    />
  </aside>
</template>

<script>
// Estabelecendo a conversa com header para abrir e fechar esse componente
import { mapState } from "vuex"; // Responsável por mapear um atributo da store dentro desse componente
import Tree from "liquor-tree"; // Responsável pelo menu de árvore
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]), // Mapeando apenas o atributo isMenuVisible, mas pode ser passado um objeto
  data: function () {
    return {
      treeFilter: "", // Campo de busca
      treeData: this.getTreeData(), // Setando a promisse no atributo treeData
      treeOptions: {
        //Usa o id pra montar os nós da árvore
        propertyNames: { text: "name" }, // Mudando a propriedade de data para text
        filter: { emptyText: "Categoria não encontrada" },
      },
    };
  },
  methods: {
    getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      return axios.get(url).then((res) => res.data); // retornando uma promisse
    },
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  /* Menu vertical */
  display: flex;
  flex-direction: column; /* Mudando a orientação de linha para coluna */
  flex-wrap: wrap; /* Para permitir quebra de linha */
}

.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-child {
  filter: brightness(2.5);
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background-color: transparent;
}

.tree-filter-empty {
  color: #ccc;
  margin-left: 20px;
  font-size: 1.3rem;
}
</style>