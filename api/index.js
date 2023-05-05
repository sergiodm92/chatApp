const app = require("./src/app");
const http = require("http").createServer(app);
const cors = require('cors');
const { URL_CLIENT } = process.env;
const io = require('socket.io')(http, {
  cors: {
    origin: URL_CLIENT,
    methods: ["GET", "POST"]
  }
});
const { conn } = require("./src/db");

// Socket.io events
io.on("connection", (socket) => {
  // console.log("a user connected with id", socket.id);

  // Listen to the "new message" event from the client
  socket.on("new message", (data) => {
    console.log(data);
  });

  // Send a message to the connected client
  socket.emit("connected", "You are now connected to the server!");

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("user disconnected with id", socket.id);
  });
});

// Sync database and start the server
conn.sync({ force: false })
  .then(() => {
    console.log("Database synced");

    // Start the server
    const PORT = process.env.PORT || 3001;
    http.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database: ", err);
  });



