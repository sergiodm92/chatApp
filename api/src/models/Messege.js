const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo de mensaje
  const Message = sequelize.define(
    "message",
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Message;
};
