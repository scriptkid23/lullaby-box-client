import React from "react";

import StartScreen from "../screens/start.screen";
import HomeScreen from "../screens/home.screen";

import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import AuthenticatedGuard from "../guards/authenticated.guard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={(props) => <StartScreen {...props} />}
        />
        <AuthenticatedGuard
          path="/room/:id"
          exact
          component={(props) => <HomeScreen {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
