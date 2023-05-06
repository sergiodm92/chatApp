const { Router } = require("express");
const { allMessages, createMessage, deleteAll } = require("../services/messages_services");
const router = Router();

const {
  customResponseError,
  customResponseSuccess,
} = require("../utils/customAPIResponse");

router.get("/", async (req, res) => {
  try{
    let messages = []
    messages = await allMessages();
    return res.status(200).send(customResponseSuccess(messages));
  }
  catch (error) {
    console.error(error);
    return res.status(400).json(customResponseError({ message: 'Error al traer los mensajes' }));
  }
});

router.post('/', async (req, res) => {
  const { userId, text } = req.body;
  try {
    let message = {}
    newDate = new Date()
    date = newDate.getTime()
    message = await createMessage(userId, text, date);
    return res.status(200).send(customResponseSuccess(message));
  } catch (error) {
    console.error(error);
    return res.status(400).json(customResponseError({ message: 'Error al crear el mensaje' }));
  }
});

app.delete('/', async (req, res) => {
  try {
    // Realizar la consulta para eliminar todos los mensajes
    deleteAll()
    // Enviar una respuesta adecuada al cliente
    res.status(200).json({ message: 'Todos los mensajes han sido eliminados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar los mensajes' });
  }
});

module.exports = router;
