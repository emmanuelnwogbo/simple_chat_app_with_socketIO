const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  //console.log(socket);

  socket.emit('newEmail', {
    from: 'mike',
    text: `what's up!`,
    createdAT : 123
  });

  socket.emit('newMessage', {
    from: 'jerry',
    age: 12,
    text: 'see you then',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('message: ', message);
  });

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
