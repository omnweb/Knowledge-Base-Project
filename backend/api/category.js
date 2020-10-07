// 
module.exports = app => {
    // Importando funções de validação 
    const { existsOrError, notExistsOrError } = app.api.validation

    // Seguindo o padrão do usuário, o método abaixo servirá para incluir e alterar categorias
    const save = (req, res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }
        if (req.params.id) category.id = req.params.id
        try {
            existsOrError(category.name, 'Categoria não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }
        if (category.id) {
            // Método atualizar
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            //Método inserir
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Método remover
    const remove = async (req, res) => {
        // Só será possível excluir categorias caso não tenha nenhum artigo assossiado a ela
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')
            // verificando se possui uma subcategoria
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id }) // Verificando se o id recebido em parâmetros é = ao da subcategoria            
            notExistsOrError(subcategory, 'Categoria possui subcategorias vinculadas')

            const articles = await app.db('articles')
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Categoria possui artigos vinculados')

            //Tentando excluir de fato
            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    //Recebe a lista de categorias e retorna a mesma lista acrecida de um novo atributi
    const withPath = categories => {
        // Pegando a categoria pai
        const getParent = (categories, parentId) => {
            //Encontrando a categoria pai
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null // Caso parent contenha caracteres ele os retorna, senhão retorna null
        }

        // Transformando um array de categorias em um novo array de categorias contendo path
        const categoriesWithPath = categories.map(category => {
            let path = category.name // Pega o nome da categoria
            let parent = getParent(categories, category.parentId) //Procuta o pai se existir, caso exista acrescenta:  pai > categoria ou pai > pai > categoria

            while (parent) {
                path = `${parent.name} > ${path}` //Concatenando o pai com path
                parent = getParent(categories, parent.parentId) //se o getParent retornar null ele sai do wile, senão ele busca um novo pai até chegar em um nó que não tem pai
            }
            return { ...category, path } //retornando as categorias com o atributo path a mais
        })

        //Função para exibir as categorias em ordem alfabética
        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })
        return categoriesWithPath
    }

    //Retornando todas as categorias
    const get = (req, res) => {
        app.db('categories') //Se não quiser filtrar as categorias já é suficiente para mostrar
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    // Retornando categoria por id
    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    // Criando menu em formato de árvore
    const toTree = (categories, tree) => {
        // Filtrando as categorias que não tem parent.id setado, que serão os pais
        if (!tree) tree = categories.filter(c => !c.parentId)

        // Pegando todos os parent Node ( nós filhos), referente aos pais
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id

            // Gerando a árvore de nós
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    // Função para renderizar o menu em formato de árvore
    const getTree = (req, res) => {
        app.db('categories')
            // Recebendo a lista de categorias do banco de dados e repassando para o json
            .then(categories => res.json(toTree(categories))) // Passando para withPath para montar os caminhos de depois para toTree para montar a árvore
            .catch(err => res.status(500).send(err))
    }
    //Retornando os métodos
    return { save, remove, get, getById, getTree }
}