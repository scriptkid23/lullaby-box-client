import React from "react";
import { PanelProvider } from "../context/panel.context";
import { SocketContext } from "../context/socket.context";
import { ChatProvider } from "../context/chat.context";
import Chat from "./components/chat.component";
import Panel from "./components/panel.component";
import axios from "axios";
import { baseUrl } from "../constants";

export default class HomeScreen extends React.PureComponent {
  static contextType = SocketContext;
  constructor() {
    super();
    this.state = {
      data: {},
      actions: null,
    };
  }
  async componentDidMount() {
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
    this.setState({ actions: actions });
    const { data } = await axios.get(
      baseUrl + "/room/" + localStorage.getItem("roomId")
    );
    if (data) {
      console.log(data);
      this.setState(data);
    }
  }
  componentWillUnmount() {
    this.state.actions &&
      this.state.actions.leaveRoom({
        roomId: localStorage.getItem("roomId"),
        userId: localStorage.getItem("userId"),
      });
  }
  render() {
    console.log("home render");
    return (
      <div className="layout">
        <div className="content">
          <ChatProvider>
            <Chat  data={this.state.data}/>
          </ChatProvider>

          <PanelProvider>
            <Panel  data={this.state.data}/>
          </PanelProvider>
        </div>
      </div>
    );
  }
}
