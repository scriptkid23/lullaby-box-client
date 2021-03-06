import axios from "axios";
import React from "react";
import mockup from "../assets/mockup.mp3";
import { baseUrl } from "../constants";
import { SocketContext } from "./socket.context";
const PanelContext = React.createContext({});

class PanelProvider extends React.Component {
  static contextType = SocketContext;
  constructor() {
    super();
    this.state = {
      socket: null,
      isPlaying: false,
      tracks: [
        {
          name: "Track is Empty",
          artist: "Unknown",
          url: "",
          image: "https://f4.bcbits.com/img/a3440516125_10.jpg",
        },
      ],
      trackProgress: 0,
      trackIndex: 0,
      participants: [],
    };
  }

  componentDidMount() {
    const { state, actions } = this.context;
    this.fetchData();
    state.socket && state.socket.receiverSetTrackIndex(this.setTrackIndex);
    state.socket && state.socket.receiverTrack(this.receiverTrack);
    state.socket && state.socket.receiverEventPlay(this.setStateIsPlay);
    state.socket && state.socket.receiverLeaveRoom(this.setStateIsLeaveRoom);
    state.socket && state.socket.receiverJoinRoom(this.setStateJoinRoom);
    this.setState({ socket: state.socket });
  }
  // componentWillUnmount() {
  //   console.log("disconnected")
  //   this.state.socket && this.state.socket.disconnect();
  // }
  
  setStateJoinRoom = (data) => {
      this.setState({
        participants: [...this.state.participants, data.participant],
      });
  };
  fetchData = async() => {
    try{
      let {data} = await axios.get(baseUrl+'/room/'+localStorage.getItem('roomId'));
      this.setState({
        participants: [...data.participants],
        tracks:[...this.state.tracks,...data.tracks],
      })
    }
    catch(e){
      localStorage.clear();
    }
 
   
  }
  setStateIsLeaveRoom = (data) => {
    let participants = this.state.participants.filter((value, index) => {
      return value.userId !== data.userId;
    });
    this.setState({
      participants: [...participants],
    });
    
  };
  setIsPlaying = (flag) => {
    
    this.state.socket.sendEventPlay({
      roomId: localStorage.getItem("roomId"),
      flag: flag,
    });
  };
  setStateIsPlay = (flag) => {
   
    this.setState({ isPlaying: flag.flag });
  };
  // setTrackProgress = (value) => {
  //   this.setState({ trackProgress: value });
  // };

  setTrackIndex = (index) => {
   
    this.setState({ trackIndex: index.trackIndex });
  };
  addTrack = (value) => {
    this.state.socket.sendAddTrack(value);
  };
  receiverTrack = (value) => {
    this.setState({
      tracks: [...this.state.tracks, value.track],
    });
  };

  render() {
    const value = {
      state: {
        isPlaying: this.state.isPlaying,
        tracks: this.state.tracks,
        trackIndex: this.state.trackIndex,
        socket: this.state.socket,
        participants: this.state.participants,
      },
      actions: {
        setIsPlaying: this.setIsPlaying,
        setTrackIndex: this.setTrackIndex,
        addTrack: this.addTrack,
       
      },
    };
    return (
      <PanelContext.Provider value={value}>
        {this.props.children}
      </PanelContext.Provider>
    );
  }
}

export { PanelContext, PanelProvider };
