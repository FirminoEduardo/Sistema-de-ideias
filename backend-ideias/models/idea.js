module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    categoria: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendente',
    },
    votos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  return Idea;
};
