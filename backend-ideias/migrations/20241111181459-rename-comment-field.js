'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Comments', 'comentario', 'conteudo');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Comments', 'conteudo', 'comentario');
  }
};