import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SocketService } from '../services/socket.service';

function App() {
  const [socket, setSocket] = React.useState(null);
  React.useEffect(() =>{
    const socket = new SocketService();
    socket.receiverMessage(onReceiver);
    setSocket(socket);
    return () => socket.disconnect();
  },[])
  const onReceiver = (data) => {
    console.log(data)
  }
  const onSubmit = () => {
    socket.sendMessage("123");
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onSubmit}>Click me</button>
      </header>
    </div>
  );
}

export default App;
