require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes'); // Rota de autenticação
const ideaRoutes = require('./routes/ideaRoutes'); // Rota de ideias
const bcrypt = require('bcryptjs');
const { User } = require('./models');  // Assumindo que o modelo de usuário está em ./models

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes); // Rota de autenticação
app.use('/api/ideas', ideaRoutes); // Rota de ideias

app.get('/', (req, res) => {
  res.send('API do Sistema de Ideias está rodando');
});


const createAdminUser = async () => {
  const adminExists = await User.findOne({ where: { email: 'admin@example.com' } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('senhaSeguraAdmin', 10);
    await User.create({
      nome: 'Admin',
      email: 'admin@example.com',
      senha: hashedPassword,
      permissao: 'admin'
    });
    console.log('Usuário admin criado com sucesso.');
  }
};

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

createAdminUser().catch(console.error);