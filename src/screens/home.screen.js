import React from "react";
import { PanelProvider } from "../context/panel.context";
import { SocketContext } from "../context/socket.context";
import { ChatProvider } from "../context/chat.context";
import Chat from "./components/chat.component";
import Panel from "./components/panel.component";
import { DataProvider } from "../context/data.context";

export default function HomeScreen() {
  const { state, actions } = React.useContext(SocketContext);
  React.useEffect(() => {
    console.log("join room when reload")
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
    <DataProvider>
      <div className="layout">
        <div className="content">
          <ChatProvider>
            <Chat />
          </ChatProvider>

          <PanelProvider>
            <Panel />
          </PanelProvider>
        </div>
      </div>
    </DataProvider>
  );
}
