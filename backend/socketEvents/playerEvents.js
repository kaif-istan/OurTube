function playerEvents(socket, users, rooms) {
  socket.on('sendInfo', data => {
    let user = users.find(user => user.id === socket.id)
    if (user) socket.broadcast.to(user.room).emit('getInfo', data)
  })

  socket.on('urlChanged', url => {
    let user = users.find(user => user.id === socket.id)
    if (user) socket.broadcast.to(user.room).emit('urlChange', url)
  })

  socket.on('paused', () => {
    let user = users.find(user => user.id === socket.id)
    if (user) socket.broadcast.to(user.room).emit('pause')
  })

  socket.on('played', currentTime => {
    let user = users.find(user => user.id === socket.id)
    if (user) socket.broadcast.to(user.room).emit('play', currentTime)
  })

  socket.on('seeked', currentTime => {
    let user = users.find(user => user.id === socket.id)
    if (user) socket.broadcast.to(user.room).emit('seek', currentTime)
  })
}

module.exports = playerEvents
