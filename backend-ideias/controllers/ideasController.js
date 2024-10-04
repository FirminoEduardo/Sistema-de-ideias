const { Idea } = require('../models');

//Criacao de novas ideias

exports.submitIdea = async (req, res) => {
  const { titulo, descricao } = req.body;
  
  try {
    const newIdea = await Idea.create({ titulo, descricao, status: 'pendente', votos: 0 });
    res.status(201).json(newIdea);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao submeter ideia!' });
  }
};

//Votacao

exports.voteIdea = async (req, res) => {
    const ideaId = req.params.id;
    const idea = await Idea.findByPk(ideaId);
  
    if (!idea) return res.status(404).json({ error: 'Ideia não encontrada' });
  
    idea.votos += 1;
    await idea.save();
  
    res.json(idea);
  };
  