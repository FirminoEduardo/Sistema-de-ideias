module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    votos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ideaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Ideas', // Referência à tabela de ideias
        key: 'id',
      },
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Idea, { foreignKey: 'ideaId' });
  };

  return Comment;
};
