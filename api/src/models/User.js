const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Definir el modelo para User
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
