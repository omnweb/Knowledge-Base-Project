# Projeto Base de Conhecimento


Trata-se de um sistema que possibilita criar postagens utilizando textos ricos, imagens, vídeos, links, códigos com highlight, a fim de compartilhar conhecimentos relativos a um ou mais assuntos, permitindo separar os artigos por categorias pai e filha, sendo exibidas em formato de árvore.
É possível se cadastrar, cadastrar, alterar e excluir usuários, artigos e categorias.
Para garantir a concistência dos dados todos os campos dos formulários possuem validação.
O sistema de login fornece um token com prazo de expiração e permissões diferentes para usuário e administrador, o que restringe o acesso às determinadas áreas da aplicação, sendo acessadas apenas por quem possui permissão.
Com uso de Schedule é feita a troca de informações entre o banco de dados relacional onde os dados são criptografados e salvos e o banco de dados não relacional, que recebe dados específicos para alimentar o painel administrativo. 

## Cadastrando-se
Cadastrando-se na aplicação

![Preview](https://github.com/omnweb/Knowledge-Base-Project/blob/master/images/cadastrando-se.gif?raw=true)

## Acesso de Usuário
Aplicação com acesso de usuário

![Preview](https://github.com/omnweb/Knowledge-Base-Project/blob/master/images/login_usuario.gif?raw=true)

## Acesso de Administrador
Login e edição do usuário criado

![Preview](https://github.com/omnweb/Knowledge-Base-Project/blob/master/images/loginAdmin_edicaoUsuario.gif?raw=true)

## Criação de uma nova Categoria.
Inserção de uma nova categorya derivada de javaScript.

![Preview](https://github.com/omnweb/Knowledge-Base-Project/blob/master/images/loginAdmin_edicaoUsuario.gif?raw=true)

## Criação de um novo Artigo.
Inserção de um novo Artigo na Categotia recem criada.

![Preview](https://github.com/omnweb/Knowledge-Base-Project/blob/master/images/cadastro_categoria.gif?raw=true)

## Edição do Artigo.
Edição do Artigo Projeto Flappy Bird, incluindo a imagem do artigo, um vídeo e o link para o github.

![Preview](https://github.com/omnweb/Knowledge-Base-Project/blob/master/images/editando_artigo.gif?raw=true)

## Como obter uma cópia

Estas instruções lhe darão uma cópia do projeto em funcionamento em sua máquina local para fins de desenvolvimento e teste. Consulte a implantação de notas sobre como implantar o projeto em um sistema ao vivo.

### Pré-requisitos:

Você precisa do NodeJS e do NPM instalado em sua máquina.
Também serão necessários o PostgreSql e MongoDB. 

```
Iniciar o PostgreSql:
No Prompt de comando digite psql -U  postgres
Em seguinda a senha definida na instação

Iniciar o MongoDB:
No Prompt de comando digite mongod

Dentro de backend: 
npm install
npm start

Dentro de frontend: 
npm install
npm run serve

Produção:
npm run build

```

## Construído com:
Backend


* [Node.js](https://nodejs.org/en/) - JavaScript runtime built
* [Passport](http://www.passportjs.org) - Simple, unobtrusive authentication for Node.js
* [JWT](https://jwt.io/) - Authenticating with a JSON Web Token
* [Express](https://expressjs.com/pt-br/) - Fast, unopinionated, minimalist web framework for Node.js
* [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js
* [Knex](http://knexjs.org/) - Is a "batteries included" SQL query builder
* [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
* [MongoDB](https://www.mongodb.com/) - The database for
modern applications

Frontend
* [Vue.js](https://vuejs.org/) -The Progressive JavaScript Framework
* [BootstrapVue](http://knexjs.org/) - most popular framework for building responsive, mobile-first sites
* [FontWeasome](https://fontawesome.com/) - Get vector icons and social logos on your website
* [highlight.js](https://highlightjs.org/) - Syntax highlighting for the Web
* [Liquor Tree](https://github.com/amsik/liquor-tree) - A Vue tree component that allows you to present hierarchically organized data





## Author:

* **Ovidio Matiazi Neto** - [LinkedIn](https://www.linkedin.com/in/ovidio-matiazi-neto-38a937130/)


## Licença

Este projeto é licenciado sobre a licença MIT - veja [LICENSE.md](LICENSE.md) para mais informações.

## Acknowledgments

* Este projeto foi construído durante as aulas do curso Web Moderno da [Cod3r](https://github.com/cod3rcursos).
