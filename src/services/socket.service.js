import SocketIOClient from "socket.io-client";

export const ENVIRONMENTS = {
  DEVELOPMENT: "ws://34.142.244.8",
  PRODUCTION: "https://34.142.244.8",
};
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ENVIRONMENTS.DEVELOPMENT
    : ENVIRONMENTS.PRODUCTION;
class SocketService {
  socket;
  constructor() {
    this.socket = SocketIOClient(baseUrl, {
      transports: ["websocket", "polling"],
    });
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
  sendIsTyping = (value) => {
    this.socket.emit("SEND_IS_TYPING", value);
  };
  receiverIsTyping = (callback) => {
    this.socket.on("RECEIVER_IS_TYPING", callback);
  };
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
    this.socket.emit("SEND_MESSAGE", value);
  };
  receiverMessage = (callback) => {
    this.socket.on("RECEIVER_MESSAGE", callback);
  };
  sendIsSeen = (value) => {
    this.socket.emit("SEND_IS_SEEN", value);
  };
  receiverIsSeen = (callback) => {
    this.socket.on("RECEIVER_IS_SEEN", callback);
  };
  disconnect = () => {
    this.socket.disconnect();
  };
}
export default new SocketService();
