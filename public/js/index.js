var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
  //document.write('hello world');

  socket.emit('createEmail', {
    to: 'mark',
    text: 'hey this is me'
  });

  socket.emit('createMessage', {
    message: 'hello from here'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
  console.log('New email', email);
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});