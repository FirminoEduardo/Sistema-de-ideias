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

const {Vote } = require('../models');

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

// Moderação de Ideias (Aprovação ou Rejeição)
exports.moderateIdea = async (req, res) => {
  const ideaId = req.params.id;
  const { status } = req.body;  // O status será "aprovada" ou "rejeitada"
  const userPermission = req.user.permissao;  // Verifica a permissão do usuário

  if (userPermission !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem moderar ideias.' });
  }

  try {
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada.' });
    }

    // Atualiza o status da ideia
    idea.status = status;
    await idea.save();

    res.json({ message: `Ideia ${status} com sucesso!`, ideia: idea });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao moderar ideia.' });
  }
};

// Listar e filtrar ideias
exports.listIdeas = async (req, res) => {
  const { categoria, status } = req.query;

  try {
    const where = {};
    
    if (categoria) where.categoria = categoria;
    if (status) where.status = status;

    const ideas = await Idea.findAll({ where });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar ideias.' });
  }
};
