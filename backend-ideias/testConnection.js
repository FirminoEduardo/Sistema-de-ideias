const { Sequelize } = require('sequelize');

// Configurações do banco de dados
const sequelize = new Sequelize('sistema_ideias', 'eduardofirmino', 'postgres', {
    host: '127.0.0.1',
    dialect: 'postgres',
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

testConnection();
