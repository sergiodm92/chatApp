const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // maneja el evento "mensaje-nuevo" enviado por el cliente
  socket.on('mensaje-nuevo', (data) => {
    console.log(data.mensaje);
    // envía el mensaje a todos los clientes conectados
    io.emit('mensaje-recibido', data);

    // envía un mensaje específico al cliente que envió el mensaje original
    socket.emit('reload', 'reload');
  });
});


server.name = 'API';

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

//Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
