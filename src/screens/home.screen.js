import React from "react";
import { PanelProvider } from "../context/panel.context";
import { SocketContext } from "../context/socket.context";
import { ChatProvider } from "../context/chat.context";
import Chat from "./components/chat.component";
import Panel from "./components/panel.component";
export default function HomeScreen() {
  const { state, actions } = React.useContext(SocketContext);
  React.useEffect(() => {
    document.body.classList.toggle("dark");
    actions.joinRoom({
      roomId: localStorage.getItem("roomId"),
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
        <ChatProvider>
          <Chat />
        </ChatProvider>

        <PanelProvider>
          <Panel />
        </PanelProvider>
      </div>
    </div>
  );
}
