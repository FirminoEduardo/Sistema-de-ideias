# Sistema de Submissão e Votação de Ideias

Este projeto é um **Sistema de Submissão e Votação de Ideias** que oferece aos usuários uma plataforma para compartilhar ideias, votar nas ideias de outros usuários e adicionar comentários. Ele conta com uma interface intuitiva e funcionalidades robustas para promover a interação e avaliação de ideias, além de um sistema de controle de permissões para usuários administradores.

## Funcionalidades Principais

- **Autenticação de Usuário**: Usuários podem registrar uma conta e fazer login, garantindo que apenas membros autenticados possam submeter ideias, votar e comentar.
- **Submissão de Ideias**: Após o login, os usuários podem enviar novas ideias contendo título, descrição e categoria.
- **Votação de Ideias**: Os usuários podem votar em suas ideias favoritas, e as ideias são ordenadas com base no número de votos.
- **Comentários Anônimos**: Qualquer usuário autenticado pode comentar nas ideias de outros, sendo os comentários exibidos de forma anônima.
- **Votação de Comentários**: Além das ideias, os comentários também podem ser votados, destacando os mais relevantes.
- **Arquivamento de Ideias**: Administradores podem arquivar ideias, tornando-as invisíveis para usuários comuns, mas mantendo-as visíveis para administradores.
- **Sistema de Permissões**: Apenas usuários com a permissão de administrador têm a capacidade de arquivar ideias, garantindo um controle adequado.

## Sistema de Controle de Permissões

O sistema conta com dois tipos de usuários:

1. **Usuário Padrão**: Pode submeter ideias, votar e adicionar comentários. As ideias arquivadas por administradores não são visíveis para eles.
2. **Administrador**: Possui todas as permissões de um usuário padrão, além de poder arquivar ideias. Ideias arquivadas permanecem visíveis apenas para administradores.

## Design Visual

O sistema conta com uma interface limpa e moderna, incluindo:

- **Botões intuitivos**: Para votar em ideias e comentários.
- **Ordenação por relevância**: Ideias e comentários são automaticamente organizados pelo número de votos.
- **Comentários anônimos**: Os nomes dos usuários não são exibidos nos comentários para garantir o anonimato.
- **Botão de arquivar**: Administradores têm um botão vermelho destacado para arquivar ideias.

## Estrutura de Funcionalidades

- **Página Principal**: Exibe a lista de ideias ordenadas por número de votos, com opções para votar e comentar em cada uma delas.
- **Submissão de Ideias**: Formulário para submissão de novas ideias, acessível para todos os usuários autenticados.
- **Votação**: Tanto ideias quanto comentários podem ser votados para destacar os melhores.
- **Arquivamento**: Disponível apenas para administradores, permitindo que ideias sejam arquivadas e removidas da visualização geral.

## Arquitetura e Tecnologias

O sistema é dividido em um backend com APIs REST e um frontend dinâmico:

- **Frontend**: Desenvolvido com React.js, Axios e React Router para navegação e chamadas API.
- **Backend**: Desenvolvido com Node.js e Express.js, utilizando Sequelize como ORM para manipulação do banco de dados PostgreSQL.
- **Autenticação**: Proteção das rotas via JSON Web Tokens (JWT).
- **Banco de Dados**: PostgreSQL, gerenciado por meio do Sequelize.

## Objetivo do Projeto

O **Sistema de Submissão e Votação de Ideias** foi desenvolvido com o objetivo de fornecer uma plataforma interativa para promover a criação de novas ideias e o engajamento da comunidade por meio de votação e feedback. Com seu sistema de controle de permissões, ele é capaz de distinguir administradores de usuários padrão, garantindo o gerenciamento adequado das ideias submetidas.

---

Sinta-se à vontade para contribuir com o projeto e propor melhorias através de issues ou pull requests.
