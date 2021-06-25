import React from "react";
import { SocketContext } from "../context/socket.context";

import Chat from "./components/chat.component";
import Panel from "./panel.screen";

export default function HomeScreen() {
  const {state, actions} = React.useContext(SocketContext);
  React.useEffect(() => {
    
    actions.joinRoom({
      roomId: localStorage.getItem('roomId'),
      reconnect: true,
      participant: {
        userId: localStorage.getItem('userId'),
        name: localStorage.getItem('name'),
        avatar: localStorage.getItem('avatar'),
      },
    })
    
  },[actions])
  return (
    <div className="layout">
      <div className="content">
        <Chat />
        <Panel tracks={state.tracks}/>
      </div>
    </div>
  );
}
