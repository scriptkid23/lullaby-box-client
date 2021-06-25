import React from "react";
import { PanelProvider } from "../context/panel.context";
import { SocketContext } from "../context/socket.context";
import { ChatProvider } from "../context/chat.context";
import Chat from "./components/chat.component";
import Panel from "./panel.screen";

export default class HomeScreen extends React.PureComponent {
  static contextType = SocketContext;
  componentDidMount() {
    const { actions } = this.context;
    actions.joinRoom({
      roomId: localStorage.getItem("roomId"),
      reconnect: true,
      participant: {
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
        avatar: localStorage.getItem("avatar"),
      },
    });
  }
  componentWillUnmount() {
    const { actions } = this.context;
    actions.leaveRoom({
      roomId: localStorage.getItem("roomId"),
      userId: localStorage.getItem("userId"),
    });
  }
  render() {
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
}
