import React from "react";
import { SocketService } from "../services/socket.service";
import mockup from '../assets/mockup.mp3'
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
          title: "To the Moon",
          artist: "hooligan.",
          audioSrc: mockup,
          image: "https://i.ytimg.com/vi/nmKTlmByng0/maxresdefault.jpg",
        },
      ]
    })
    socket.receiverSetTrackIndex(this.setTrackIndex);
    socket.receiverTrack(this.receiverTrack);
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
  addTrack = (value) => {
    this.state.socket.sendAddTrack(value);
  }
  receiverTrack = (value) => {
    this.setState({
      tracks:[
        ...this.state.tracks,
        value,
      ]
    })
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
              setTrackIndex: this.setTrackIndex,
              addTrack: this.addTrack,
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
 