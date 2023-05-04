require("dotenv").config();
const { Message, User } = require("../db");
const server = require('../app')
const io = require("socket.io")(server);


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
    io.on("connection", (socket) => {
      console.log("Cliente conectado");
    
      // maneja el evento "mensaje-nuevo" enviado por el cliente
      socket.on("mensaje-nuevo", (data) => {
        console.log(data.mensaje);
        // envía el mensaje a todos los clientes conectados
        io.emit("mensaje-recibido", data);
    
        // envía un mensaje específico al cliente que envió el mensaje original
        socket.emit("reload", "reload");
      });
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
