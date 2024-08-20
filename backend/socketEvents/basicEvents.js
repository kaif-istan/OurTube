function basicEvents(socket, users, rooms) {
  // Every user on joining the app will send
  // the name, room (code if any) and type (join/create)
  // to the server through this event "enter"
  socket.on('enter', ({ name, room, type }) => {
    console.log('[SOCKET] New client connected!')

    // If the type is create, we have to create the room ourselves
    // We also have to send it to the client so that it is aware about
    // the room we created for it
    if (type === 'create') {
      // Creating room
      room = `RO${socket.id}OM`
      rooms[room] = {
        count: 1,
        admin: socket.id,
        id: room,
      }

      // Sending room to client
      socket.emit('getRoom', rooms[room])
    }

    // Joining the socket to the room
    socket.join(room)

    // If the user is joining an already existing room
    // we need to make sure that the room the user is trying
    // to join exists
    if (type === 'join') {
      // This means that the room doesn't exist
      if (typeof rooms[room] === 'undefined') socket.emit('validateRoom', false)
      // This means that the room does exist
      else {
        socket.emit('validateRoom', true)

        ++rooms[room].count

        // We need to alert the other users already in the room
        socket.broadcast.to(room).emit('userJoin', name)
        // that the user has joined. This event helps with that
      }
    }

    // We are sending the socket id back to the user as well
    socket.emit('getID', socket.id)

    // Will help us keep track of users
    // admin refers to the user who created the room who will access
    // to controlling the video playback
    users.push({ id: socket.id, name, room, admin: type === 'create' })
  })

  // Helps us keep track of when the user disconnects
  // so that we can perform cleanup tasks
  const handleExit = () => {
    console.log('[SOCKET] Client disconnected!')

    // Remove the user from the global users list
    let user = users.splice(
      users.findIndex(user => user.id === socket.id),
      1
    )[0]

    // The reason we are checking this is because users can join
    // into non existing rooms, connect to the socket and then
    // "validateRoom" will return false, and then they leave
    // and "disconnect" occurs. Hence we only want the next actions
    // to occur if the room actually exists
    if (user && typeof rooms[user.room] !== 'undefined') {
      --rooms[user.room].count

      // Deleting room if no one is in it
      if (!rooms[user.room].count) delete rooms[user.room]
      // If user is admin and there are still people in the room
      // we need to assign a new admin
      else if (user.admin) {
        // Gets all the users of the room
        let room_users = users.filter(u => u.room === user.room)

        // Chooses a random user to be the new admin
        let new_admin = room_users[Math.floor(Math.random() * room_users.length)]

        // Tells all the other users in that room, that the admin has left
        socket.broadcast.to(user.room).emit('adminLeave', { name: user.name, new_admin })

        let new_admin_index = users.findIndex(u => u.id === new_admin.id)
        users[new_admin_index].admin = true
      }
      // Tells all the other users in that room, that the user has left
      else socket.broadcast.to(user.room).emit('userLeave', user.name)
    }
  }

  socket.on('exit', handleExit)
  socket.on('disconnect', handleExit)
}

module.exports = basicEvents
