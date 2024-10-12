module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    conteudo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    ideaId: DataTypes.INTEGER,
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Idea, { foreignKey: 'ideaId' });
  };

  return Comment;
};
