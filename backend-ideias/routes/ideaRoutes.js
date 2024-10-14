const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { Idea, Comment } = require('../models');

const router = express.Router();

// Rota para buscar todas as ideias
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.findAll({
      order: [['votos', 'DESC']] // Ordena as ideias pelo número de votos em ordem decrescente
    });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ideias', error });
  }
});

// Rota para submeter uma nova ideia
router.post('/submit', verifyToken, async (req, res) => {
  const { titulo, descricao, categoria } = req.body;

  try {
    const newIdea = await Idea.create({ titulo, descricao, categoria, votos: 0, status: 'nova' });
    res.status(201).json(newIdea); // Retorna a nova ideia
  } catch (error) {
    res.status(500).json({ message: 'Erro ao submeter ideia', error });
  }
});

// Rota para votar em uma ideia
router.post('/:id/vote', verifyToken, async (req, res) => {
  try {
    const idea = await Idea.findByPk(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada' });
    }
    idea.votos += 1; // Incrementa o número de votos
    await idea.save();
    res.status(200).json({ message: 'Voto registrado com sucesso', votos: idea.votos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao votar na ideia', error });
  }
});

// Rota para adicionar um comentário em uma ideia
router.post('/:id/comments', verifyToken, async (req, res) => {
  const { conteudo } = req.body; // Aqui você deve estar pegando 'conteudo'

  if (!conteudo) {
    return res.status(400).json({ message: 'O conteúdo do comentário é obrigatório' });
  }

  try {
    const idea = await Idea.findByPk(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada' });
    }

    // Cria um novo comentário e associa à ideia
    const newComment = await Comment.create({ conteudo, ideaId: idea.id, votos: 0 });
    res.status(201).json({ message: 'Comentário adicionado com sucesso', comment: newComment });
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    res.status(500).json({ message: 'Erro ao adicionar o comentário', error: error.message });
  }
});

// Rota para buscar todas as ideias com comentários
router.get('/', async (req, res) => {
    try {
      const ideas = await Idea.findAll({
        include: [{
          model: Comment, // Inclui o modelo de Comment
          as: 'Comments', // Certifique-se de que a alias 'Comments' está definida no seu modelo
        }],
        order: [['votos', 'DESC']] // Ordena as ideias pelo número de votos em ordem decrescente
      });
      res.status(200).json(ideas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar ideias', error });
    }
  });
  
// Rota para votar em um comentário
router.post('/:id/comments/:commentId/vote', verifyToken, async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comentário não encontrado' });
      }
  
      comment.votos += 1; // Incrementa o número de votos
      await comment.save();
      res.status(200).json({ message: 'Voto no comentário registrado com sucesso', votos: comment.votos });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao votar no comentário', error });
    }
  });
  
module.exports = router;
