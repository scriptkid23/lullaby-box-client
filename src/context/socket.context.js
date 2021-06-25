import React from "react";
import { SocketService } from "../services/socket.service";
import mockup from "../assets/mockup.mp3";
const SocketContext = React.createContext({});

class SocketProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      isPlaying: false,
      tracks: [
        {
          title: "Track is Empty",
          artist: "Unknown",
          audioSrc: mockup,
          image: "https://f4.bcbits.com/img/a3440516125_10.jpg",
        },
      ],
      trackProgress: 0,
      trackIndex: 0,
      members: [],
    };
  }
  receiverMessage = (data) => {
    this.setState({ trackProgress: data.trackProgress });
  };
  componentWillUnmount() {
    this.state.socket.disconnect();
  }
  componentDidMount() {
    const socket = new SocketService();

    socket.receiverSetTrackIndex(this.setTrackIndex);
    socket.receiverTrack(this.receiverTrack);
    socket.receiverEventPlay(this.setStateIsPlay);
    socket.receiverLeaveRoom(this.setStateIsLeaveRoom);

    this.setState({ socket: socket });
  }
  setIsPlaying = (flag) => {
    this.state.socket.sendEventPlay({
      roomId: localStorage.getItem("roomId"),
      flag: flag,
    });
  };
  setStateIsPlay = (flag) => {
    console.log(flag);
    this.setState({ isPlaying: flag.flag });
  };
  setTrackProgress = (value) => {
    this.setState({ trackProgress: value });
  };
  joinRoom = async (value) => {
    this.state.socket && this.state.socket.joinRoom(value);
   
  };
  leaveRoom = (value) => {
    console.log(value)
    this.state.socket.leaveRoom(value);
  };
  setStateIsLeaveRoom = (value) => {
    console.log(value);
  };
  sendMessage = (data) => {
    this.setState({ isPlaying: data.flag });
  };
  setTrackIndex = (index) => {
    this.setState({ trackIndex: index.trackIndex });
  };
  addTrack = (value) => {
    this.state.socket.sendAddTrack(value);
  };
  receiverTrack = (value) => {
    this.setState({
      tracks: [...this.state.tracks, ...value],
    });
  };

  render() {
    const value = {
      state: {
        isPlaying: this.state.isPlaying,
        tracks: this.state.tracks,
        socket: this.state.socket,
        trackIndex: this.state.trackIndex,
      },
      actions: {
        sendMessage: this.sendMessage,
        setIsPlaying: this.setIsPlaying,
        setTrackIndex: this.setTrackIndex,
        addTrack: this.addTrack,
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
