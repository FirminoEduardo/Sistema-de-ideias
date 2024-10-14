'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      votos: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ideaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ideas',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Comments');
  },
};
