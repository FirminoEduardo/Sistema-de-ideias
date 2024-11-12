// migrations/[timestamp]-rename-conteudo-to-comentario.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Comments', 'conteudo', 'comentario');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Comments', 'comentario', 'conteudo');
  }
};