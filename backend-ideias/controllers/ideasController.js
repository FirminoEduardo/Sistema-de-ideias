const { Idea, Vote, Notification } = require('../models');

// Submeter Ideia
exports.submitIdea = async (req, res) => {
  const { titulo, descricao, categoria } = req.body;

  try {
    const newIdea = await Idea.create({
      titulo,
      descricao,
      categoria,
      status: 'pendente',
      votos: 0
    });

    res.status(201).json({ message: 'Ideia submetida com sucesso!', ideia: newIdea });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao submeter ideia!' });
  }
};

// Votar em uma ideia
exports.voteIdea = async (req, res) => {
  const ideaId = req.params.id;
  const userId = req.user.id;

  try {
    const existingVote = await Vote.findOne({ where: { userId, ideaId } });
    if (existingVote) {
      return res.status(400).json({ message: 'Você já votou nesta ideia.' });
    }

    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada.' });
    }

    idea.votos += 1;
    await idea.save();
    await Vote.create({ userId, ideaId });

    res.json({ message: 'Voto registrado com sucesso!', ideia });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar voto.' });
  }
};

// Moderação de Ideias (Aprovação ou Rejeição)
exports.moderateIdea = async (req, res) => {
  const ideaId = req.params.id;
  const { status } = req.body;
  const userPermission = req.user.permissao;

  if (userPermission !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem moderar ideias.' });
  }

  try {
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada.' });
    }

    idea.status = status;
    await idea.save();

    await Notification.create({
      userId: idea.userId,
      message: `Sua ideia "${idea.titulo}" foi ${status}.`
    });

    res.json({ message: `Ideia ${status} com sucesso!`, ideia });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao moderar ideia.' });
  }
};

// Listar e filtrar ideias
exports.listIdeas = async (req, res) => {
  const { categoria, status } = req.query;

  try {
    const where = { isArchived: false };  // Apenas ideias não arquivadas

    if (categoria) where.categoria = categoria;
    if (status) where.status = status;

    const ideas = await Idea.findAll({ where });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar ideias.' });
  }
};

// Arquivar uma ideia
exports.archiveIdea = async (req, res) => {
  const ideaId = req.params.id;

  try {
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada.' });
    }

    idea.isArchived = true;
    await idea.save();

    res.json({ message: 'Ideia arquivada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao arquivar ideia.' });
  }
};