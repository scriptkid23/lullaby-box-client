import React from "react";
import { SocketService } from "../services/socket.service";
import mockup from "../assets/mockup.mp3";
import { SocketContext } from "./socket.context";
import axios from "axios";
import { baseUrl } from "../constants";
const ChatContext = React.createContext({});
// heart https://assets8.lottiefiles.com/datafiles/nZgj7wTd56UtH6m/data.json
// conguration https://assets2.lottiefiles.com/packages/lf20_u4yrau.json
// loki https://assets10.lottiefiles.com/packages/lf20_ocrcnofw.json
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
      effectName:'',
    };
  }
  // receiverMessage = (data) => {
  //   this.setState({ trackProgress: data.trackProgress });
  // };
  fetchData = async() => {
    let {data} = await axios.get(baseUrl+'/room/'+localStorage.getItem('roomId'));
    
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
      this.setState({effect: true,effectName: 'hpbd'})
    }
    if(value.message.message === 'love'){
      this.setState({effect: true,effectName: 'love'})
    }
    if(value.message.message === 'loki'){
      this.setState({effect: true,effectName: 'loki'})
    }
    this.setState({
      messages: [...this.state.messages, value.message],
    })
  }
  sendMessage = (value) => {
    this.state.socket.sendMessage(value);
  }

  leaveRoom = (value) => {
    this.state.socket && this.state.socket.leaveRoom(value);
  };
  setStateIsLeaveRoom = (value) => {
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
        effectName: this.state.effectName,
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
