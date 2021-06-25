import React from "react";
import { SocketService } from "../services/socket.service";
import mockup from "../assets/mockup.mp3";
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

  componentDidMount() {
    const { state, actions } = this.context;
    state.socket && state.socket.receiverSetTrackIndex(this.setTrackIndex);
    state.socket && state.socket.receiverTrack(this.receiverTrack);
    state.socket && state.socket.receiverEventPlay(this.setStateIsPlay);
    // state.socket.receiverLeaveRoom(this.setStateIsLeaveRoom);

    this.setState({ socket: state.socket });
  }
  setIsPlaying = async (flag) => {
    console.log("Set is playing");
    await this.state.socket.sendEventPlay({
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
        trackIndex: this.state.trackIndex,
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
