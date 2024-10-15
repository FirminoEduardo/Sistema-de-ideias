Sistema de Ideias
Este projeto é um Sistema de Submissão e Votação de Ideias que permite aos usuários submeterem suas próprias ideias, votar em outras ideias e adicionar comentários. O projeto inclui autenticação JWT para proteger as rotas, controle de permissões para usuários administradores, e permite que ideias sejam arquivadas, tornando-as invisíveis para outros usuários.

Funcionalidades
Autenticação de Usuário: Usuários podem criar uma conta e fazer login no sistema utilizando JWT.
Submissão de Ideias: Qualquer usuário autenticado pode submeter novas ideias com título, descrição e categoria.
Votação de Ideias: Os usuários podem votar em ideias e os votos são contabilizados e ordenados.
Comentários Anônimos: Usuários podem comentar nas ideias sem que seus nomes apareçam, e os comentários também podem ser votados.
Arquivamento de Ideias: Administradores podem arquivar ideias, o que as torna invisíveis para os outros usuários.
Sistema de Permissões: Somente usuários com permissão de "admin" podem arquivar ideias.
Tecnologias Utilizadas
Frontend: React.js
React Router
Axios
CSS customizado
Backend: Node.js, Express.js
Sequelize (ORM)
JWT para autenticação
PostgreSQL como banco de dados
Ferramentas de Desenvolvimento:
Insomnia para testar a API
PgAdmin para gerenciar o banco de dados PostgreSQL
Requisitos
Node.js (v14+)
NPM ou Yarn
PostgreSQL
PgAdmin (opcional para gerenciar o banco de dados)

Configuração do Projeto

Clone o repositório:
git clone https://github.com/seu-usuario/sistema-de-ideias.git

Acesse o diretório do projeto:
cd sistema-de-ideias


Backend

Acesse o diretório do backend:

cd backend-ideias
Instale as dependências:
npm install

Crie um arquivo .env na raiz do diretório backend-ideias com as seguintes variáveis:

PORT=3000
DB_URL=your-database-url
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
DB_DATABASE=sistema_ideias
DB_HOST=localhost
JWT_SECRET=sua-chavesecreta

Sincronize o banco de dados com o Sequelize:
npx sequelize-cli db:migrate

Inicie o servidor:
npm start

O backend estará disponível em http://localhost:3000.

Frontend
Acesse o diretório do frontend:
cd ../frontend-ideias

Instale as dependências:
npm install

Crie um arquivo .env na raiz do diretório frontend-ideias com a URL base do backend:
REACT_APP_API_URL=http://localhost:3000/api

Inicie o frontend:
npm start

O frontend estará disponível em http://localhost:3001.

Rotas da API

Autenticação
POST /api/auth/login: Faz login no sistema.
Body: { "email": "email", "senha": "senha" }
POST /api/auth/register: Registra um novo usuário.
Body: { "nome": "Nome", "email": "email", "senha": "senha" }

Ideias
GET /api/ideas: Retorna todas as ideias, exceto as arquivadas.
POST /api/ideas/submit: Submete uma nova ideia.
Body: { "titulo": "Título", "descricao": "Descrição", "categoria": "Categoria" }
POST /api/ideas/:id/vote: Vota em uma ideia.
PUT /api/ideas/:id/archive: Arquiva uma ideia (somente para admins).

Comentários
POST /api/ideas/:id/comments: Adiciona um comentário a uma ideia.
Body: { "conteudo": "Texto do comentário" }
POST /api/ideas/:ideaId/comments/:commentId/vote: Vota em um comentário.

Funcionalidades para Administradores
Usuários administradores (com permissao: 'admin') têm a capacidade de arquivar ideias. As ideias arquivadas não serão visíveis para usuários comuns, mas ainda serão listadas para os administradores.

Para criar um usuário admin, você pode usar o Insomnia ou uma ferramenta similar para fazer uma requisição POST para a rota /api/auth/register com o campo permissao: "admin":

json
Copiar código
{
  "nome": "Admin",
  "email": "admin@admin.com",
  "senha": "admin",
  "permissao": "admin"
}
Estilo Visual
O frontend está estilizado com um design limpo e minimalista. Aqui estão algumas das características visuais:

Botões de votar e comentar estilizados para serem intuitivos.
Comentários e ideias ordenados por número de votos.
Botão de arquivar para administradores destacado em vermelho.


Estrutura de Diretórios

sistema-de-ideias/
├── backend-ideias/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── migrations/
│   ├── server.js
│   └── .env
├── frontend-ideias/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   └── .env
└── README.md

Contribuições
Contribuições são bem-vindas! Se você encontrar um bug ou tiver sugestões de melhorias, fique à vontade para abrir uma issue ou enviar um pull request.

