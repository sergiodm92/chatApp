require("dotenv").config();
const { Message, User } = require("../db");

const allMessages = async () => {
  try {
    const messages_all = await Message.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    const mensagges = messages_all.map((msg) => {
      return {
        text: msg.text,
        date: msg.date,
        user: msg.user.name,
        userId: msg.userId
      };
    });
    return mensagges;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createMessage = async (userId, text, date) => {
  try {
    const message = await Message.create({
      text: text,
      userId: userId,
      date: date
    });
    

    return message;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el mensaje");
  }
};

module.exports = {
  allMessages,
  createMessage,
};
