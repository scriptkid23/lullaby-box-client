import SocketIOClient from 'socket.io-client';
const ENDPOINT = "ws://localhost:8081";

export class SocketService {
    socket
    constructor(){
     
        this.socket = SocketIOClient(ENDPOINT,{
            query: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQzODQ2ODYyODksInN1YiI6IjYwZDA1ZDk5MTc2ZWQzM2RiYzE2YjRjMCIsImV4cCI6MTYyNDM4NDY4OTg4OX0.DajL86cYP35jw_hwPi0Dn1TvqlDbt9x-wPQqHBgs61c"
              }
        });
    }
    sendMessage = (value) => {
        this.socket.emit("send_message",value);
    }
    receiverMessage = (callback) => {
        this.socket.on("receiver_message",callback);
    }
    disconnect = () => {
        this.socket.disconnect();
    }
    
    
}