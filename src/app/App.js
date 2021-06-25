import React from "react";

import AudioPlayer from "../audio/audio.player";
import StartScreen from "../screens/start.screen";
import HomeScreen from "../screens/home.screen";
import { SocketContext } from "../context/socket.context";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import AuthenticatedGuard from "../guards/authenticated.guard";

function App() {
  const { state, actions } = React.useContext(SocketContext);
  return (
    <BrowserRouter>
      {/* {state.tracks.length > 0 && <AudioPlayer tracks={state.tracks} />} */}
      <Switch>
        <Route
          path="/"
          exact
          component={(props) => <StartScreen {...props} />}
        />
        <AuthenticatedGuard
          path="/room/:id"
          exact
          component={(props) => <HomeScreen {...props}/>}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
