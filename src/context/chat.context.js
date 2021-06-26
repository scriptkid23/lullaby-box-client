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
      owner:localStorage.getItem("userId"),
      effect: false,
    };
  }
  // receiverMessage = (data) => {
  //   this.setState({ trackProgress: data.trackProgress });
  // };
  fetchData = async() => {
    let {data} = await axios.get(baseUrl+'/room/'+localStorage.getItem('roomId'));
    console.log(data);
    this.setState({
      messages: data.messages,
      room:data.name,
    })
   
  }
  componentDidMount() {
    const { state, actions } = this.context;
    this.fetchData();
    state.socket && state.socket.receiverLeaveRoom(this.setStateIsLeaveRoom);
    state.socket && state.socket.receiverMessage(this.updateMessages);
    this.setState({ socket: state.socket });
  }
  updateMessages = (value) => {
    if(value.message.message === 'hpbd'){
      this.setState({effect: true})
    }
    this.setState({
      messages: [...this.state.messages, value.message],
    })
  }
  sendMessage = (value) => {
    this.state.socket.sendMessage(value);
  }

  leaveRoom = (value) => {
    console.log("start leave room");
    console.log(value);
    this.state.socket && this.state.socket.leaveRoom(value);
  };
  setStateIsLeaveRoom = (value) => {
    console.log("Leave Room");
    console.log(value);
  };
  setStateEffect = (value) => {
    this.setState({effect: value})
  }

  render() {
    const value = {
      state: {
        socket: this.state.socket,
        room: this.state.room,
        messages: this.state.messages,
        owner: this.state.owner,
        effect: this.state.effect,
      },
      actions: {
        leaveRoom: this.leaveRoom,
        sendMessage: this.sendMessage,
        setStateEffect: this.setStateEffect,
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
