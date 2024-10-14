'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false, // Não pode ser nulo
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Permitindo nulo se necessário
    },
    ideaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'Comments', // Nome da tabela no banco de dados
    timestamps: true,
  });

  Comment.associate = function(models) {
    // Define associações aqui
    Comment.belongsTo(models.Idea, {
      foreignKey: 'ideaId',
      as: 'idea',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Comment;
};
