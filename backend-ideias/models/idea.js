'use strict';
module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    categoria: DataTypes.STRING,
    votos: { type: DataTypes.INTEGER, defaultValue: 0 }, // Campo para contar votos
    status: DataTypes.STRING
  });

  Idea.associate = function(models) {
    Idea.hasMany(models.Comment, { as: 'comentarios', foreignKey: 'ideaId' }); // Relacionamento com comentários
  };

  return Idea;
};
