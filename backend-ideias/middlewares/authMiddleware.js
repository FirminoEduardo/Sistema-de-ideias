const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Acesso negado! Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Verifica o token JWT
    req.user = { id: decoded.id }; // Armazena o ID do usuário em req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido!' });
  }
};
