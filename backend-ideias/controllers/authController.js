const bcrypt = require('bcryptjs');
const { User } = require('../models');  // Certifique-se de que o modelo User está correto

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

    // Cria novo usuário no banco de dados
    user = await User.create({
      nome,
      email,
      senha: hashedPassword,
      permissao
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário!' });
  }
};

const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
//const { User } = require('../models');  // Certifique-se de que o modelo User está correto

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    // Compara a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id, permissao: user.permissao }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login!' });
  }
};

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Adicione esta linha antes de usar process.env.JWT_SECRET


