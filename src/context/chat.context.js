import React from "react";
import { SocketService } from "../services/socket.service";
import mockup from "../assets/mockup.mp3";
import { SocketContext } from "./socket.context";
import axios from "axios";
import { baseUrl } from "../constants";
const ChatContext = React.createContext({});

class ChatProvider extends React.Component {
  static contextType = SocketContext;
  constructor() {
    super();
    this.state = {
      socket: null,
      messages: [],
      room: "",
    };
  }
  // receiverMessage = (data) => {
  //   this.setState({ trackProgress: data.trackProgress });
  // };
  componentDidMount() {
    const { state, actions } = this.context;

    state.socket && state.socket.receiverLeaveRoom(this.setStateIsLeaveRoom);

    this.setState({ socket: state.socket });
    console.log(this.props.data);
    
  }
  componentWillUnmount() {
    this.state.socket && this.state.socket.disconnect();
  }

  leaveRoom = (value) => {
    console.log("start leave room");
    console.log(value);
    this.state.socket.leaveRoom(value);
  };
  setStateIsLeaveRoom = (value) => {
    console.log("Leave Room");
    console.log(value);
  };

  render() {
    const value = {
      state: {
        socket: this.state.socket,
      },
      actions: {
        leaveRoom: this.leaveRoom,
      },
    };
    return (
      <ChatContext.Provider value={value}>
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

export { ChatContext, ChatProvider };
