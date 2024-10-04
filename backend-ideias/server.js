const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes'); // Rota de autenticação

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes); // Rota de autenticação

app.get('/', (req, res) => {
  res.send('API do Sistema de Ideias está rodando');
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
