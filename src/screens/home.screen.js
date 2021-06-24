import React from "react";
import { SocketContext } from "../context/socket.context";

import Chat from "./components/chat.component";
import Panel from "./panel.screen";

export default function HomeScreen() {
  const {state, actions} = React.useContext(SocketContext);
  return (
    <div className="layout">
      <div className="content">
        <Chat />
        <Panel tracks={state.tracks}/>
      </div>
    </div>
  );
}
