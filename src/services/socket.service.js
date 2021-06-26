import SocketIOClient from "socket.io-client";

export const ENVIRONMENTS = {
  DEVELOPMENT: "ws://localhost:8081",
  PRODUCTION: "http://metaphor-service.herokuapp.com/",
};
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ENVIRONMENTS.DEVELOPMENT
    : ENVIRONMENTS.PRODUCTION;
class SocketService {
  socket;
  constructor() {
    this.socket = SocketIOClient(baseUrl);
  }
  sendSetTrackIndex = (value) => {
    this.socket.emit("SEND_SET_TRACK_INDEX", value);
  };
  receiverSetTrackIndex = (callback) => {
    this.socket.on("RECEIVER_SET_TRACK_INDEX", callback);
  };
  sendAddTrack = (value) => {
    this.socket.emit("SEND_ADD_TRACK", value);
  };
  receiverTrack = (callback) => {
    this.socket.on("RECEIVER_ADD_TRACK", callback);
  };
  sendEventPlay = (value) => {
    this.socket.emit("SEND_EVENT_PLAY", value);
  };
  receiverEventPlay = (callback) => {
    this.socket.on("RECEIVER_EVENT_PLAY", callback);
  };
  // sendSetTrackProgress = (value) => {
  //   this.socket.emit("SEND_SET_TRACK_PROGRESS", value);
  // };
  // receiverSetTrackProgress = (callback) => {
  //   this.socket.on("RECEIVER_SET_TRACK_PROGRESS", callback);
  // };
  joinRoom = (value) => {
    this.socket.emit("JOIN_ROOM", value);
  };
  receiverJoinRoom = (callback) => {
    this.socket.on("RECEIVER_JOIN_ROOM", callback);
  };
  leaveRoom = (value) => {
    this.socket.emit("LEAVE_ROOM", value);
  };
  receiverLeaveRoom = (callback) => {
    this.socket.on("RECEIVER_LEAVE_ROOM", callback);
  };
  sendMessage = (value) => {
    this.socket.emit("SEND_MESSAGE",value);
  }
  receiverMessage = (callback) => {
    this.socket.on("RECEIVER_MESSAGE",callback);
  }

  disconnect = () => {
    this.socket.disconnect();
  };
}
export default new SocketService();