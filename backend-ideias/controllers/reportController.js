const { Idea, User, Comment } = require('../models');

// Relatório das ideias mais votadas
exports.topIdeas = async (req, res) => {
  try {
    const ideas = await Idea.findAll({
      order: [['votos', 'DESC']],
      limit: 10
    });

    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório das ideias mais votadas.' });
  }
};

// Relatório de usuários mais ativos
exports.activeUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Comment, as: 'comments' }],
      order: [[sequelize.fn('COUNT', sequelize.col('comments.id')), 'DESC']],
      limit: 10
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de usuários mais ativos.' });
  }
};
