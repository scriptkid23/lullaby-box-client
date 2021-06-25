import React from "react";
import { useHistory } from "react-router";
import * as FeatherIcon from "react-feather";
import { ChatContext } from "../../context/chat.context";
import { baseUrl } from "../../constants";
import axios from "axios";
export default function ChatHeader({ room }) {
  const history = useHistory();
  const { state, actions } = React.useContext(ChatContext);
  const { mode, setMode } = React.useState(false);
  const logout = async () => {
    actions.leaveRoom({
      roomId: localStorage.getItem("roomId"),
      userId: localStorage.getItem("userId"),
    });
    localStorage.clear();
    history.push("/");
  };
  const setTheme = () => {
      document.body.classList.toggle('dark')
  };
  return (
    <div className="chat-header">
      <div className="chat-header-user">
        <figure className="avatar avatar-state-success">
          <img
            src="https://i.ytimg.com/vi/_joUTZzb9gY/maxresdefault.jpg"
            className="rounded-circle"
            alt="avatar"
          />
        </figure>
        <div>
          <h5>{room}</h5>
        </div>
      </div>
      <div className="chat-header-action">
        <ul className="list-inline">
          <li className="list-inline-item">
            <button
              className="btn btn-outline-light text-success"
              onClick={setTheme}
              id="Tooltip-Voice-Call"
            >
              <FeatherIcon.Moon />
            </button>
          </li>
          <li className="list-inline-item">
            <button
              className="btn btn-outline-light text-success"
              onClick={() => logout()}
              id="Tooltip-Voice-Call"
            >
              <FeatherIcon.LogOut />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
