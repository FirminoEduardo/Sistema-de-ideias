module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendente',  // As ideias começam como "pendente"
    },
    votos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,  // Inicia com 0 votos
    },
  });

  Idea.associate = function(models) {
    // Associações, se necessário
  };

  return Idea;
};
