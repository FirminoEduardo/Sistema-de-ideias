'use strict';
module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    votos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'ativa',
    },
    isArchived: { // Altere o nome para 'isArchived'
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por padrão, ideias não são arquivadas
    },
  }, {
    tableName: 'Ideas',
    timestamps: true,
  });

  Idea.associate = function(models) {
    Idea.hasMany(models.Comment, {
      foreignKey: 'ideaId',
      as: 'comments',
    });
  };

  return Idea;
};
