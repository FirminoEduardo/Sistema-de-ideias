const { Idea } = require('../models');

// Submeter Ideia
exports.submitIdea = async (req, res) => {
  const { titulo, descricao } = req.body;

  try {
    const newIdea = await Idea.create({
      titulo,
      descricao,
      status: 'pendente',
      votos: 0
    });

    res.status(201).json({ message: 'Ideia submetida com sucesso!', ideia: newIdea });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao submeter ideia!' });
  }
};

const { Idea, Vote } = require('../models');

// Votar em uma ideia
exports.voteIdea = async (req, res) => {
  const ideaId = req.params.id;
  const userId = req.user.id;  // O usuário é obtido a partir do token JWT

  try {
    // Verifica se o usuário já votou na ideia
    const existingVote = await Vote.findOne({ where: { userId, ideaId } });
    if (existingVote) {
      return res.status(400).json({ message: 'Você já votou nesta ideia.' });
    }

    // Incrementa o número de votos na ideia
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada.' });
    }

    idea.votos += 1;
    await idea.save();

    // Registra o voto do usuário
    await Vote.create({ userId, ideaId });

    res.json({ message: 'Voto registrado com sucesso!', ideia: idea });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar voto.' });
  }
};

