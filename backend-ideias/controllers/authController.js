const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
  const { nome, email, senha, permissao } = req.body;

  try {
    // Verifica se o usuário já existe
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'Usuário já registrado!' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria novo usuário
    user = await User.create({ nome, email, senha: hashedPassword, permissao });

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);  // Log do erro para depuração
    res.status(500).json({ error: 'Erro ao registrar usuário!' });
  }
};
