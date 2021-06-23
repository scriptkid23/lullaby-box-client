import React from "react";
import { SocketService } from "../services/socket.service";
import audioSrc from '../assets/tayto.mp3'
import ghedep from '../assets/ghedep.mp3'
const SocketContext = React.createContext({});

class SocketProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      isPlaying: false,
      tracks:[],
      trackProgress: 0,
      trackIndex:0,
    };
  }
  receiverMessage = (data) => {
    this.setState({trackProgress: data.trackProgress});
  };
  componentWillUnmount() {
    this.state.socket.disconnect();
  }
  componentDidMount() {
    const socket = new SocketService();

    this.setState({
      tracks:[
        ...this.state.tracks,
        {
          title: "Tay to",
          artist: "MCK",
          audioSrc: audioSrc,
          image: "https://i1.sndcdn.com/avatars-eZz2vSyDPYLl6J1Y-0LETkg-original.jpg",
        },
        {
          title: "Ghệ Đẹp",
          artist: "Remix",
          audioSrc: ghedep,
          image: "https://i1.sndcdn.com/avatars-eZz2vSyDPYLl6J1Y-0LETkg-original.jpg",
        },
      ]
    })
    socket.receiverMessage(this.setTrackIndex);
    this.setState({ socket: socket });
  }
  setIsPlaying = (flag) => {
    
    this.setState({isPlaying: flag});
  }
  setTrackProgress = (value) => {
    
    this.setState({trackProgress: value});
  }
  sendMessage = (data) => {
    this.setState({isPlaying:data.flag});
  };
  setTrackIndex = (index ) => {
    this.setState({trackIndex: index.trackIndex})
  }

  render() {
    const value = {
          state:{ 
            isPlaying:this.state.isPlaying,
            tracks: this.state.tracks,
            trackProgress: this.state.trackProgress,
            socket: this.state.socket,
            trackIndex: this.state.trackIndex
          },
          actions:{
              sendMessage:this.sendMessage,
              setIsPlaying: this.setIsPlaying,
              setTrackProgress: this.setTrackProgress,
              setTrackIndex: this.setTrackIndex
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
 