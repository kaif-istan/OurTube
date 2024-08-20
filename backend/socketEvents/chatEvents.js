function chatEvents(socket, users)
{
  // This event will be used to get messages from the various users
  // in a room. When we get a message, we send back the message along
  // with the info about the user who sent it, to everyone in the user's
  // room except the user.
  socket.on('chatSend', message => {
    let user = users.find(user => user.id === socket.id);
    console.log(user);
    
    socket.broadcast.to(user.room).emit('chatReceive', { name: user.name, message });
  });
}

module.exports = chatEvents;