module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return User;
  };
  