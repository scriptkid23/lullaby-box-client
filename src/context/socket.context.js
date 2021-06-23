import React from "react";
import { SocketService } from "../services/socket.service";
const SocketContext = React.createContext({});

class SocketProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: null,
    };
  }
  receiverMessage = (data) => {
    console.log(data);
  };
  componentWillUnmount() {
    this.state.socket.disconnect();
  }
  componentDidMount() {
    const socket = new SocketService();
    socket.receiverMessage(this.receiverMessage);
    this.setState({ socket: socket });
  }

  sendMessage = () => {
    this.state.socket.sendMessage("123");
  };

  render() {
    const value = {
          state:{ },
          actions:{
              sendMessage:this.sendMessage
          }
      }
    return (
      <SocketContext.Provider value={value}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export { SocketContext, SocketProvider };
