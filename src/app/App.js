import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AudioPlayer from "../audio/audio.player";
import audioSrc from '../assets/tayto.mp3'
import { SocketContext } from "../context/socket.context";
const tracks = [
  
];
function App() {
  const {state, actions} = React.useContext(SocketContext);
  return (
    <div>
      {state.tracks.length > 0 && <AudioPlayer tracks={state.tracks} />}
    </div>
  );
}

export default App;
