const app = require('./src/app.js');
const { conn} = require('./src/db.js');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001; 
const  http  = require('http');


const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin: 'http://localhost:3000/',
  }
})

io.on('connection',()=>{
  console.log('a user connected')
})


// Syncing all the models at once.
conn.sync().then(() => {
  app.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
