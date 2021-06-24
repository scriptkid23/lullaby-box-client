import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CreateRoomComponent from "./components/create-room.component";
import JoinRoomComponent from "./components/join-room.component";

export default function StartScreen() {
  return (
    <div id="screens-start-screen">
      <div className="d-flex flex-column justify-content-center h-100 align-items-center">
        <div className="typewriter">
          <h1 className="font-weight-medium">Welcome to the Lullaby Box</h1>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {" "}
            <CreateRoomComponent />
          </div>
          <div className="col">
            {" "}
            <JoinRoomComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
