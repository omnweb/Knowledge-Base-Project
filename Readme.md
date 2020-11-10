# Projeto Base de Conhecimento


Trata-se de um sistema que possibilita criar postagens utilizando textos ricos, imagens, vídeos, links, códigos com highlight, a fim de compartilhar conhecimentos relativos a um ou mais assuntos, permitindo separar os artigos por categorias pai e filha, sendo exibidas em formato de árvore.
É possível se cadastrar, cadastrar, alterar e excluir usuários, artigos e categorias.
Para garantir a concistência dos dados todos os campos dos formulários possuem validação.
O sistema de login fornece um token com prazo de expiração e permissões diferentes para usuário e administrador, o que restringe o acesso às determinadas áreas da aplicação, sendo acessadas apenas por quem possui permissão.
Com uso de Schedule é feita a troca de informações entre o banco de dados relacional onde os dados são salvos e o banco de dados não relacional, que recebe dados específicos para alimentar o painel administrativo. 


![Preview](https://github.com/omnweb/React-Crud/blob/master/React%20crud.gif?raw=true)

## Início

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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

* [React.js](https://pt-br.reactjs.org/) -The React Framework.
* [Node.js](https://nodejs.org/en/) - JavaScript runtime built


## Author:

* **Ovidio Matiazi Neto** - [LinkedIn](https://www.linkedin.com/in/ovidio-matiazi-neto-38a937130/)


## Licença

Este projeto é licenciado sobre a licença MIT - veja [LICENSE.md](LICENSE.md) para mais informações.

## Acknowledgments

* Este projeto foi construído durante as aulas do curso Web Moderno da [Cod3r](https://github.com/cod3rcursos).
