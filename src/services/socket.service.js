import SocketIOClient from "socket.io-client";

export const ENVIRONMENTS = {
  DEVELOPMENT : "ws://localhost:8081",
  PRODUCTION : "http://metaphor-service.herokuapp.com",
}
const baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 
                ENVIRONMENTS.DEVELOPMENT : 
                ENVIRONMENTS.PRODUCTION; 
export class SocketService {
  socket;
  constructor() {
    this.socket = SocketIOClient(baseUrl, {
      query: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQzODQ2ODYyODksInN1YiI6IjYwZDA1ZDk5MTc2ZWQzM2RiYzE2YjRjMCIsImV4cCI6MTYyNDM4NDY4OTg4OX0.DajL86cYP35jw_hwPi0Dn1TvqlDbt9x-wPQqHBgs61c",
      },
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
  disconnect = () => {
    this.socket.disconnect();
  };
}
