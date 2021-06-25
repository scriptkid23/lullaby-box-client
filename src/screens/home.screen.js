import React from "react";
import { PanelProvider } from "../context/panel.context";
import { SocketContext } from "../context/socket.context";
import { ChatProvider } from "../context/chat.context";
import Chat from "./components/chat.component";
import Panel from "./components/panel.component";
import axios from "axios";
import { baseUrl } from "../constants";
import { DataProvider } from "../context/data.context";

export default function HomeScreen() {

  const { state, actions } = React.useContext(SocketContext);
  React.useEffect(() => {
    actions.joinRoom({
      roomId: localStorage.getItem("roomId"),
      reconnect: true,
      participant: {
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
        avatar: localStorage.getItem("avatar"),
      },
    });
  }, []);

  return (
    <div className="layout">
      <div className="content">
        {/* <ChatProvider>
              <Chat />
            </ChatProvider> */}

        <PanelProvider>
          <Panel />
        </PanelProvider>
      </div>
    </div>
  );
}
