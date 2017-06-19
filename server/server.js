const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

let server = http.createServer(app);
let io = socketIO(server);

let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //there is also socket.leave()
    //io.emit -> io.to('the Office Fans').emit
    //socket.broadcast.emit -> socket.broadcast.to('the Office Fans').emit
    //socket.emit
    socket.emit('newMessage', generateMessage(`Welcome to the ${params.room} chat room`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage(`${params.name} has joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(`${user.name}`, message.text));
    }
    console.log('message: ', message);

    callback();
  });

  socket.on('createLocationMessage', (coords) => {

    let user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude));
    }

    /*io.emit('newLocationMessage', generateLocationMessage(coords.latitude, coords.longitude));*/

  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage(`${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
