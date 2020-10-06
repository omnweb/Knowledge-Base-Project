// Colocando as consultas específicas neste arquivo separado

module.exports = {
    // Função para quando clicado na categoria pai do menu, retornar todos os filhos
    // Gera uma tabela recursiva onde a partir do pai pega os filhos e assim sucessivamente 
    categoryWithChildren:`
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c 
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}