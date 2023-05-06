const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const { customResponseSuccess, customResponseError } = require("./utils/customAPIResponse.js");
const { createMessage } = require("./services/messages_services.js");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

require("./db.js");

app.name = "API";

const corsOptions = {
  origin: 'https://chatapp-production-eb2f.up.railway.app/',
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.post('/mensajes',async(req, res) => {
  const { userId, text } = req.body;
  try {
    let message = {}
    newDate = new Date()
    date = newDate.getTime()
    message = await createMessage(userId, text, date);
    io.emit("connected", "You are now connected to the server!");
    return res.status(200).send(customResponseSuccess(message));
  } catch (error) {
    console.error(error);
    return res.status(400).json(customResponseError({ message: 'Error al crear el mensaje' }));
  }


});

app.use("/", routes);


//Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = http;
