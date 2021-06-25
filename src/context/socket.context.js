import React from "react";
import SocketService from "../services/socket.service";
import mockup from "../assets/mockup.mp3";
import axios from "axios";
import { baseUrl } from "../constants";
const SocketContext = React.createContext({});

class SocketProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: SocketService,
    };
  }
 
  joinRoom = (value) => {
    console.log("start join room");
    this.state.socket && this.state.socket.joinRoom(value);
  };
  leaveRoom = (value) => {
    console.log("start leave room");
    console.log(value);
    this.state.socket && this.state.socket.leaveRoom(value);
  };

  render() {
    console.log("socket context render");
    const value = {
      state: {
        socket: this.state.socket,
        data: this.state.data,
      },
      actions: {
        joinRoom: this.joinRoom,
        leaveRoom: this.leaveRoom,
      },
    };
    return (
      <SocketContext.Provider value={value}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export { SocketContext, SocketProvider };
