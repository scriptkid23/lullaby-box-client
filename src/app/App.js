import React from "react";

import "./App.css";
import AudioPlayer from "../audio/audio.player";

import { SocketContext } from "../context/socket.context";

function App() {
  const {state, actions} = React.useContext(SocketContext);
  return (
    <div>
      {state.tracks.length > 0 && <AudioPlayer tracks={state.tracks} />}
    </div>
  );
}

export default App;
