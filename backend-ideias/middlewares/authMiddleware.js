const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Certifique-se de que o modelo User está importado corretamente

exports.verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Acesso negado! Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Verifica o token JWT
        const user = await User.findByPk(decoded.id); // Obtém o usuário pelo ID decodificado
        
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
        req.user = user; // Armazena o objeto do usuário completo em req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido!' });
    }
};
