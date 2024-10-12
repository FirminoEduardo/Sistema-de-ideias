'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Ideas', 'isArchived', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,  // Por padrão, ideias não são arquivadas
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Ideas', 'isArchived');
  }
};
