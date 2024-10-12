const { Comment, Idea } = require('../models');

// Adicionar comentário a uma ideia
exports.addComment = async (req, res) => {
  const { conteudo } = req.body;
  const ideaId = req.params.id;
  const userId = req.user.id;  // Obtém o ID do usuário autenticado

  try {
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada.' });
    }

    const comment = await Comment.create({ conteudo, userId, ideaId });
    res.status(201).json({ message: 'Comentário adicionado com sucesso!', comment });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar comentário.' });
  }
};
