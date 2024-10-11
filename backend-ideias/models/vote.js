module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: DataTypes.INTEGER,
    ideaId: DataTypes.INTEGER,
  });

  Vote.associate = function(models) {
    // Associações, se necessário
  };

  return Vote;
};
