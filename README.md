# VERZELFLIX 🎬
---
Este projeto é uma aplicação web de Lista de Filmes que utiliza a API do The Movie Database (TMDb) e um desing inspirado na Netflix para fornecer informações sobre filmes e oferecer uma ótima experiência visual. Os usuários podem criar sua conta, pesquisar filmes, visualizar detalhes, adicionar filmes à lista de favoritos, e compartilhar a lista de favoritos com outros usuários.
---
## Deploy 🚀

O projeto está disponível online e pode ser acessado através do seguinte link:

- **[Verzelflix - Aplicação de Lista de Filmes](https://verzelflix.vercel.app/home)**

Sinta-se à vontade para visitar e explorar a aplicação em tempo real!
---
# Principais Funcionalidades 🎯
---
## Funcionalidades

### 1. Registro e Autenticação de Conta

- **Registro de Conta**: Permite que os usuários criem uma conta na aplicação para gerenciar suas informações e listas de favoritos. Durante o registro, os usuários fornecem informações básicas, como nome, e-mail e senha.
- **Autenticação e Token de Sessão**: Após o login, um token de autenticação é gerado e armazenado no navegador do usuário. Esse token permite que o usuário permaneça autenticado em sessões futuras, evitando a necessidade de fazer login novamente a cada visita. O token é gerenciado de forma segura para garantir a proteção das informações do usuário.

### 2. Gerenciamento de Favoritos

- **Salvar Filmes nos Favoritos**: Os usuários podem adicionar filmes à sua lista de favoritos. Ao clicar no botão de adicionar aos favoritos, o filme é salvo na lista pessoal do usuário, permitindo acesso rápido e fácil aos filmes preferidos.
- **Visualização e Edição dos Favoritos**: A lista de favoritos é exibida em um formato organizado, permitindo que os usuários visualizem e gerenciem facilmente seus filmes preferidos. Os usuários podem remover filmes da lista de favoritos se desejarem.

### 3. Compartilhamento de Favoritos

- **Compartilhar Lista de Favoritos**: Os usuários têm a opção de compartilhar sua lista de filmes favoritos com outros usuários. Um link exclusivo é gerado e pode ser enviado a amigos ou familiares.
- **Adicionar Filmes da Lista Compartilhada**: Se um usuário receber uma lista de favoritos compartilhada, ele pode visualizar os filmes e, se desejar, adicionar filmes dessa lista à sua própria lista de favoritos.

### 4. Visualização de Detalhes dos Filmes

- **Detalhes do Filme**: Para cada filme na aplicação, são exibidas informações detalhadas, incluindo:
  - **Nota do TMDb**: A classificação do filme conforme fornecida pelo The Movie Database.
  - **Ano de Lançamento**: O ano em que o filme foi lançado.
  - **Descrição**: Um resumo ou sinopse do filme.
  - **Gêneros**: Os gêneros aos quais o filme pertence, ajudando os usuários a identificar o tipo de filme.

### 5. Edição de Perfil

- **Funcionalidade de Edição de Perfil**: Os usuários podem atualizar suas informações de perfil a qualquer momento. Isso inclui a alteração de nome de usuário, e-mail e senha. As alterações são salvas e refletidas imediatamente na conta do usuário. Atualmente, não é possível alterar a foto de perfil, mas atualizações futuras podem incluir essa funcionalidade.

### 6. Pesquisa de Filmes

- **Barra de Pesquisa**: Os usuários podem buscar filmes usando uma barra de pesquisa. A pesquisa é realizada em tempo real, e os resultados são atualizados conforme o usuário digita. Isso permite encontrar rapidamente filmes específicos que o usuário deseja explorar ou adicionar aos favoritos.
---
## Arquitetura do Projeto 🏗️

O projeto é dividido em Front-End e Back-End, cada um com sua própria estrutura de diretórios. Abaixo está uma visão geral das pastas e suas funções principais para cada parte do projeto:

### Back-End

O Back-End é desenvolvido usando **Node.js** e **Express.js**. A estrutura de diretórios é a seguinte:

- **`__test__`**: Contém testes unitários para garantir a qualidade e a funcionalidade do código da aplicação.

- **`src/config`**: Armazena configurações e utilitários essenciais para o funcionamento da aplicação, incluindo a configuração do banco de dados MongoDB.

- **`src/controllers`**: Contém os controladores que gerenciam a lógica de negócios e as interações entre os modelos e as rotas.

- **`src/middleware`**: Inclui middleware para a aplicação, como autenticação e autorização, para proteger rotas e gerenciar permissões.

- **`src/models`**: Define os modelos de dados e interage com o banco de dados, representando as entidades principais da aplicação.

- **`src/routes`**: Define as rotas da API e mapeia as solicitações para os controladores apropriados.

- **`server.js`**: O ponto de entrada principal do servidor, que configura e inicializa o servidor Express.

### Front-End

O Front-End é desenvolvido usando **React** e está organizado da seguinte forma:

- **`public`**: Contém arquivos estáticos, como o `index.html` e imagens, que são servidos diretamente pelo servidor.

- **`src/components`**: Armazena componentes reutilizáveis da interface do usuário, que são usados para construir a interface da aplicação.

- **`src/components/utils`**: Contém componentes e utilitários auxiliares que são usados em vários lugares na aplicação, como botões e indicadores de carregamento.

- **`src/services`**: Gerencia a comunicação com o Back-End, realizando chamadas à API e manipulando dados.

- **`src/app`**: Contém o componente principal da aplicação que define as rotas e organiza a estrutura da aplicação.

- **`src/index.js`**: O ponto de entrada principal da aplicação React, responsável por renderizar o componente `App` e conectar o React ao DOM.

Esta estrutura de diretórios organiza o código de forma modular e facilita o desenvolvimento e a manutenção da aplicação.
---
## Tecnologias Utilizadas 🖥️

O projeto utiliza uma combinação de tecnologias modernas para garantir uma aplicação robusta e eficiente. Abaixo está uma lista das principais tecnologias utilizadas:

### Back-End

- **Node.js**: Ambiente de execução JavaScript no servidor, utilizado para construir a API e gerenciar a lógica do servidor.
- **Express.js**: Framework para Node.js que facilita o gerenciamento de rotas e middleware, utilizado para construir a API RESTful.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar dados dos usuários e favoritos.
- **Mongoose**: Biblioteca para modelagem de dados MongoDB em Node.js, utilizada para definir esquemas e interagir com o banco de dados.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários, garantindo que apenas usuários autenticados possam acessar certas rotas.
- **bcrypt**: Biblioteca para hashing de senhas, utilizada para armazenar senhas de forma segura no banco de dados.

### Front-End

- **React**: Biblioteca JavaScript para construção da interface do usuário, utilizada para criar uma aplicação interativa e responsiva.
- **React Router**: Biblioteca para gerenciamento de rotas em aplicações React, utilizada para navegação entre páginas e componentes.
- **Axios**: Biblioteca para realizar chamadas HTTP à API do Back-End, utilizada para buscar e enviar dados para o servidor.

## Como Rodar o Projeto 🛠️

**Aviso Importante:** 

Para fins de processo seletivo, deixei as variáveis de ambiente necessárias (como a URL do MongoDB, a chave da API do TMDb e o segredo JWT) públicas no repositório. Recomenda-se **não** utilizar essas variáveis em um ambiente de produção. Para segurança adicional, crie seu próprio arquivo `.env` e ajuste as variáveis conforme necessário.

### Requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (v14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Telas do Sistema 📱

**Tela de login**

![Login](https://github.com/user-attachments/assets/76f31d4c-c365-4b4a-bff9-79f82a3f885c)

**Tela de Cadastro**

![cadastro](https://github.com/user-attachments/assets/9cff4c2d-ed0a-457f-848a-013ed2b63973)

**Tela inicial**

![home](https://github.com/user-attachments/assets/44ddbaf3-e5d5-4765-8026-ab3de33df91f)

**detalhes do filme**

![detalhes](https://github.com/user-attachments/assets/a9056824-dec2-44f1-abbb-a0068a73751d)

**Tela de Favoritos**

![meus favoritos](https://github.com/user-attachments/assets/5669d309-ac79-4fe5-8f35-313e0c40cdca)

**Importar favoritos**

![import dos favoritos](https://github.com/user-attachments/assets/a7662bb9-8bc8-4865-ad98-e90a38ba8470)

**Editar Perfil**

![editar perfil](https://github.com/user-attachments/assets/dcd776ac-c80a-4c9b-871b-bd10229ece0a)

### Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/GabrielDietze/Desafio-Elite-Dev.git
   cd Desafio-Elite-Dev
   
2. **Configuração do Back-End**
   
  *Navegue até o diretório back-end:
  
   cd backend

 *Instale as dependências do projeto:

  npm install
  
  *O arquivo .env já está incluído no repositório para fins de teste. No entanto, para segurança e em um ambiente real, você deve criar seu próprio arquivo .env com as variáveis necessárias, como:

  MONGODB_URI=<sua_string_de_conexão_do_mongo>
  JWT_SECRET=<seu_segredo_de_token>
  TMDB_API_KEY=<sua_chave_de_api_do_tmdb>

  *Inicie o servidor do Back-End. O servidor estará disponível em http://localhost:5000 e você pode usá-lo para testar as APIs usando ferramentas como o Postman:

  npm start

3. **Configuração do Front-End**

  *Navegue até o diretório front-end:

  cd app

  *Instale as dependências do Front-End:
  
  npm install

  *Inicie o servidor de desenvolvimento do Front-End:

  npm start

  O Front-End estará disponível em http://localhost:3000.

  **Uso**
  
  Acesse a aplicação no seu navegador em http://localhost:3000.
  Crie uma conta, faça login, e comece a explorar as funcionalidades de pesquisa e gerenciamento de filmes.

 **Testes 🧪**
  Para garantir a qualidade e a estabilidade do código, o projeto inclui testes unitários e de integração. Siga as instruções abaixo para rodar os testes:

  ### Back-end
  
  *Instale as dependências de desenvolvimento (se ainda não o fez):
  
  npm install --only=dev

  *Execute os testes:

  npm test

  Isso executará todos os testes unitários e de integração definidos no projeto.

  ### Front-End

  *Nota: No momento, o projeto não inclui testes para o Front-End. Devido a restrições de tempo e foco na implementação das funcionalidades principais, os testes de Front-End não foram desenvolvidos nesta fase. No entanto, recomenda-se implementar testes de Front-End futuros para garantir a qualidade e a estabilidade da interface do usuário.*
  
  **Contatos e Links 📬**
  Para qualquer dúvida, suporte ou feedback, você pode entrar em contato comigo através dos seguintes canais:

  Email: gabrieldietze@gmail.com
  LinkedIn: [Gabriel Dietze](https://www.linkedin.com/in/gabriel-dietze/)
