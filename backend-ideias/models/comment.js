'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    conteudo: {
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
        model: 'Ideas',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    tableName: 'Comments',
    timestamps: true,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Idea, { foreignKey: 'ideaId' });
  };
  
  return Comment;
};
