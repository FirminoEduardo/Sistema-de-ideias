const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado! Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Remove o "Bearer"
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido!' });
  }
};
