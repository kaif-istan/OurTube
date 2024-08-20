//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

//Components
import TextInput from '../components/textInput.js'
import Button from '../components/button.js'

import { useContext } from 'react'
import { Route, BrowserRouter as Router, withRouter, Link } from 'react-router-dom'
import StateContext from '../StateContext'
import UpdateContext from '../UpdateContext'

function Home(props) {
  const state = useContext(StateContext)
  const setState = useContext(UpdateContext)

  return (
    <div className='flex flex-row w-full py-3 px-12 items-center justify-center'>
      <div className='flex flex-col bg-gray-900 h-5/6 w-1/3 p-4 border-2 border-indigo-600 rounded-md items-center justify-center'>
        <a className='text-center w-100 text-md my-2 opacity-70'>Watch videos and chat seamlessly losing no sync!</a>

        <TextInput
          value={state.user.username}
          onChange={e =>
            setState(state => {
              state.user.username = e.target.value
            })
          }
          placeholder='Enter your name'
        />

        <div className='flex flex-col w-full py-2'>
          <Link className={!state.user.username ? 'disabled-link' : ''} to={`/app`}>
            <Button
              disabled={!state.user.username ? true : false}
              onClick={() =>
                setState(state => {
                  state.user.isAdmin = true
                })
              }
              text='Create A Room'
              fullWidth={true}
            />
          </Link>

          <a className='text-center w-100 text-xl my-3'> or</a>

          <div className='flex flex-row items-center justify-between'>
            <Link className={!state.user.username || !state.roomId ? 'disabled-link' : ''} to={`/app`}>
              <Button
                disabled={!state.user.username || !state.roomId ? true : false}
                text='Join Room'
                onClick={() =>
                  setState(state => {
                    state.user.isAdmin = false
                  })
                }
                fullWidth={true}
              />
            </Link>

            <TextInput
              value={state.roomId}
              onChange={e =>
                setState(state => {
                  state.roomId = e.target.value
                })
              }
              placeholder='Enter the Room Code'
              side
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home)
