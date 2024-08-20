# Ourtube
![Version](https://img.shields.io/badge/version-1.69-brightgreen.svg)
![Built with Love](https://img.shields.io/badge/built%20with-love-important.svg)

This project was developed by us, **Team ECMAniacs**

## Resources
- [Drive Link](https://drive.google.com/drive/folders/1sx38nbAOOsHuqw3fFyKEvAOFRXqNAD5f)

## Team ECMAniacs
- [Md Kaif](https://github.com/kaif-istan)
- [Abhishek](https://github.com/abhissshhh)

---

Ourtube is a webapp where users can stream together and chat too in real-time, with no compromises. You join a room and watch a video from a normal player, just like you would, when you watch videos alone. However this player is controlled as per the actions of the admin of the room and you have no control over it. This results in all the users of the room watching a video controlled by one. And since the video isn't actually being screen shared, the strain on the internet connection is reduced and the quality isn't compromised.

## Why We Built This
We all want to stream videos with friends together, and screen sharing is an option for that, but it has many drawbacks which can't be ignored. From bad audio and video quality to frequent lags. As a result, we can neither enjoy the video nor have a good time with our friends. Well, that's where Ourtube decides to make things easier for you. ​

## Working
We used React for the frontend along with SocketIO-client to connect to the backend and emit messages back and forth. Each user has a video player made with the help of the IFrame API.​

Users join in rooms. Each room has an admin (by default the creator of the room) who can control the playback of the video through their player whereas the others in the room can only watch the video and have no control of their player.​

The client listens for the changes the admin makes (pause/play/change video) and emits it to the server, now from the server we emit this information to all the users in that room and they make the corresponding changes in their players.

## Technologies Used
1. React
2. ExpressJS
4. SocketIO and SocketIO-client
5. Tailwind CSS
6. IFrame API