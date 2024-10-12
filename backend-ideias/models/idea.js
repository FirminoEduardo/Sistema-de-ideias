module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    categoria: DataTypes.STRING,  // Novo campo
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendente',
    },
    votos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Idea;
};
