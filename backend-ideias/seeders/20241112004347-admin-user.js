'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('senhaSeguraAdmin', 10);

    return queryInterface.bulkInsert('users', [{
      nome: 'Admin',
      email: 'admin@example.com',
      senha: hashedPassword,
      permissao: 'admin',  // Certifique-se de que o campo permissao tem a permissão 'admin'
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  }
};