module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users'  // Nome da tabela em minúsculas
  });

  return User;
};
