//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

//Components
import Textinput from '../components/textInput.js'
import Chatbit from '../components/chatbit.js'
import { createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import StateContext from '../StateContext'
import SocketContext from '../SocketContext'
import Button from './button'

function Chatbox() {
  const appState = useContext(StateContext)
  const socket = useContext(SocketContext)
  const [state, setState] = useImmer({
    chatMessage: [],
    textField: '',
  })

  function updateField(e) {
    const value = e.target.value
    setState(draft => {
      draft.textField = value
    })
  }

  function handleSubmit(e) {
    console.log(appState)
    e.preventDefault()
    //sending message to server
    if (state.textField) {
      socket.emit('chatSend', state.textField)
      //making the textField empty after sending
      setState(draft => {
        draft.chatMessage.push({ text: state.textField, name: appState.user.username })
        draft.textField = ''
      })
    }
  }

  const handleChatReceive = ({ name, message }) => {
    console.log(name, message)
    setState(draft => {
      draft.chatMessage.push({ text: message, name })
    })
  }

  const handleUserJoin = name => {
    //   console.log(`${name} has joined the room!</div>`)
    //add message to state collection of message
    setState(draft => {
      draft.chatMessage.push({ text: `${name} has joined the room!` })
    })
  }

  const handleUserLeave = name => {
    //   console.log(`${name} has left the room!</div>`)
    setState(draft => {
      draft.chatMessage.push({ text: `${name} has left the room!` })
    })
  }

  const handleAdminLeave = ({ name, new_admin }) => {
    setState(draft => {
      draft.chatMessage.push({ text: `${name} has left the room! ${new_admin.name} is the new admin` })
    })
  }

  useEffect(() => {
    socket.on('chatReceive', handleChatReceive)

    socket.on('userJoin', handleUserJoin)

    socket.on('userLeave', handleUserLeave)

    socket.on('adminLeave', handleAdminLeave)

    return () => {
      // socket.off('adminLeave', handleAdminLeave)
      socket.off('chatReceive', handleChatReceive)
      socket.off('userJoin', handleUserJoin)
      socket.off('userLeave', handleUserLeave)
      socket.off('adminLeave', handleAdminLeave)
    }
  }, [])
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className='flex flex-col h-full w-full ml-3 p-3 bg-gray-900 items-center'>
        <a className='text-lg underline'>Chat</a>

        <div className='flex flex-col flex-grow w-full overflow-y-auto'>
          {state.chatMessage.map(({ text, name }, index) => {
            return (
              <div key={index}>
                <Chatbit name={name} text={text} />
              </div>
            )
          })}
        </div>
        <form className="flex flex-row w-full">
          <Textinput value={state.textField} onChange={e => updateField(e)} placeholder='Type your message here' />
          <button type='submit' className="flex shadow-md w-20 items-center justify-center text-white py-2 px-2 my-2 ml-2 text-center border-2 rounded-md border-indigo-600 bg-indigo-500" onClick={handleSubmit}>Send</button>
          
        </form>
      </div>
    </div>
  )
}

Chatbox.defaultProps = {}

export default Chatbox
