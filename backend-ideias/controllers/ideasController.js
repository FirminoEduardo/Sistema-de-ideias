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
