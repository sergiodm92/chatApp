const { Router } = require("express");
const { allMessages, createMessage } = require("../services/messages_services");
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
    message = await createMessage(userId, text);
    return res.status(200).send(customResponseSuccess(message));
  } catch (error) {
    console.error(error);
    return res.status(400).json(customResponseError({ message: 'Error al crear el mensaje' }));
  }
});

module.exports = router;
