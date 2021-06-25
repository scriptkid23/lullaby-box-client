import React from "react";
import { PanelProvider } from "../context/panel.context";
import { SocketContext } from "../context/socket.context";
import { ChatProvider } from "../context/chat.context";
import Chat from "./components/chat.component";
import Panel from "./components/panel.component";
import axios from "axios";
import { baseUrl } from "../constants";
import { DataProvider } from "../context/data.context";

export default class HomeScreen extends React.PureComponent {
  static contextType = SocketContext;
  constructor() {
    super();
    this.state = {
      data: {},
      socket:null,
      actions: null,
    };
  }
  async componentDidMount() {
    const { state, actions } = this.context;
    actions.joinRoom({
      roomId: localStorage.getItem("roomId"),
      reconnect: true,
      participant: {
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
        avatar: localStorage.getItem("avatar"),
      },
    });
    this.setState({ socket: state.socket, actions: actions });
    // axios.get(baseUrl+'/room/'+localStorage.getItem('roomId')).then(
    //   (value) => {
    //     this.setState({
    //       data: value.data,
    //     })
    //   }
    // )
  }
  componentWillUnmount() {
    this.state.socket && this.state.socket.disconnect();
  }
  render() {
    // console.log(this.state.data);
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
