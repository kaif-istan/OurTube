import { Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import TextInput from './textInput'
import ReactPlayer from 'react-player'
import Button from './button'
import StateContext from '../StateContext'
import SocketContext from '../SocketContext'

function Player({ users }) {
  const state = useContext(StateContext)
  const socket = useContext(SocketContext)
  const [inputUrl, setInputUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=I8PkQgPiSq8')
  const [isPlaying, setIsPlaying] = useState(true)
  const player = useRef()

  const handleGetInfo = data => {
    setVideoUrl(data.url)
    player.current.seekTo(data.currTime, 'seconds')
    //playing if the received status is play, else pause, will adjust for buffering later
    setIsPlaying(data.currStatus == 1)
    // if (data.currStatus == 1) player.current.getInternalPlayer().playVideo()
    // else player.current.getInternalPlayer().pauseVideo()
  }

  const handleUserJoin = name => {
    if (state.user.isAdmin)
      socket.emit('sendInfo', {
        url: videoUrl,
        currTime: player.current.getCurrentTime(),
        currStatus: player.current.getInternalPlayer().getPlayerState(),
      })
  }

  const handlePause = () => {
    if (!state.user.isAdmin) player.current.getInternalPlayer().pauseVideo()
  }

  const handlePlay = currentTime => {
    console.log(state.user.id)
    if (!state.user.isAdmin) {
      player.current.seekTo(currentTime, 'seconds')
      player.current.getInternalPlayer().playVideo()
    }
  }

  const handleUrlChange = url => {
    if (!state.user.isAdmin) setVideoUrl(url)
  }

  const handleSeek = currTime => {
    if (!state.user.isAdmin) player.current.seekTo(currTime, 'seconds')
  }

  //listen for Video Info for the first time component renders
  useEffect(() => {
    socket.on('getInfo', handleGetInfo)

    // emitting Video Info from admin if new user joins
    socket.on('userJoin', handleUserJoin)

    //listening for pause from server
    socket.on('pause', handlePause)

    //listening for play from server
    socket.on('play', handlePlay)

    //listening for urlChange from server
    socket.on('urlChange', handleUrlChange)

    socket.on('seek', handleSeek)

    return () => {
      socket.off('getInfo', handleGetInfo)
      socket.off('seek', handleSeek)
      socket.off('userJoin', handleUserJoin)
      socket.off('pause', handlePause)
      socket.off('play', handlePlay)
      socket.off('urlChange', handleUrlChange)
    }
  }, [])

  //sending pause Event from Admin so server sends a Pause to everyone in the room
  const onPause = e => {
    console.log(player.current.getCurrentTime())
    if (state.user.isAdmin) socket.emit('paused')
  }

  const onPlay = e => {
    console.log(player.current.getCurrentTime())
    if (state.user.isAdmin) socket.emit('played', player.current.getCurrentTime())
  }

  //sending UrlChanged event so server broadcasts a urlChange event
  const handleSubmit = e => {
    e.preventDefault()
    // console.log(player.current.getInternalPlayer())
    console.log(state.user)
    console.log(videoUrl)
    console.log(ReactPlayer.canPlay(videoUrl))
    setVideoUrl(inputUrl)
    socket.emit('urlChanged', inputUrl)
    // setVideoId(inputUrl.split('v=')[1].split('&')[0])
  }

  // const onSeek = e => {
  //   console.log(player.current.getCurrentTime())
  //   socket.emit('seeked', player.current.getCurrentTime())
  // }

  return (
    <div className='flex flex-col justify-center'>
      {state.user.isAdmin && (
        <div className='flex h-full w-full justify-center'>
          <div className='flex flex-col w-full justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-row'>
              <TextInput placeholder='Enter YT video link' value={inputUrl} onChange={e => setInputUrl(e.target.value)} />
              <button type='submit' className='flex shadow-md w-36 items-center justify-center text-white py-2 px-2 my-2 ml-2 text-center border-2 rounded-md border-indigo-600 bg-indigo-500'>
                Change Video
              </button>
            </form>
          </div>
        </div>
      )}
      <div className='flex'>
        {!ReactPlayer.canPlay(videoUrl) && <div>INVALID URL</div>}
        <ReactPlayer
          ref={player}
          id='player'
          // config={{
          //   youtube: {
          //     playerVars: { controls: state.user.isAdmin ? 1 : 1 },
          //   },
          // }}
          url={videoUrl}
          width='900px'
          height='500px'
          style={{ pointerEvents: !state.user.isAdmin && 'none' }}
          onPause={onPause}
          onPlay={onPlay}
          playing={isPlaying}
          // onSeek={onSeek}
        />
      </div>

      <div className='flex flex-col h-full w-full justify-center'>
        <div>ROOMID = {' ' + state.roomId}</div>
        {state.user.isAdmin && <div>USERS = {' ' + users}</div>}
      </div>
    </div>
  )
}

export default Player
