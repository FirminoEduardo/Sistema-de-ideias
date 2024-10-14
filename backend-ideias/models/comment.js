module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comentario: {
      type: DataTypes.STRING,
      allowNull: false, // O comentário não pode ser nulo
    },
    votos: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Inicializa os votos com 0
    },
    ideaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Ideas', // Nome da tabela de ideias
        key: 'id',
      },
      allowNull: false, // O id da ideia não pode ser nulo
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Idea, { foreignKey: 'ideaId' }); // Define a associação com a ideia
  };

  return Comment;
};
