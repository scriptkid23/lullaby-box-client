import React from "react";
import { useHistory } from "react-router";
import * as FeatherIcon from "react-feather";
import { ChatContext } from "../../context/chat.context";
import { Tooltip } from "reactstrap";

function Switchtheme() {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [mode, setMode] = React.useState(false);
  const setTheme = () => {
    document.body.classList.toggle("dark");
    setMode(!mode);
  };
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <React.Fragment>
      <button
        className={`btn btn-outline-light ${
          mode ? "text-warning" : "text-success"
        }`}
        onClick={setTheme}
        id="Tooltip-Theme"
      >
        {!mode ? <FeatherIcon.Moon />: <FeatherIcon.Sun/>}
      </button>
      <Tooltip
        placement="bottom"
        isOpen={tooltipOpen}
        target={"Tooltip-Theme"}
        toggle={toggle}
      >
        {!mode ? "Dark mode" : "Light mode"}
      </Tooltip>
    </React.Fragment>
  );
}
export default function ChatHeader({ room }) {
  const history = useHistory();
  const { actions } = React.useContext(ChatContext);

  const logout = async () => {
    actions.leaveRoom({
      roomId: localStorage.getItem("roomId"),
      userId: localStorage.getItem("userId"),
    });
    localStorage.clear();
    history.push("/");
  };
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
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
            <Switchtheme />
          </li>
          <li className="list-inline-item">
            <button
              className="btn btn-outline-light text-success"
              onClick={() => logout()}
              id="Tooltip-Logout"
            >
              <FeatherIcon.LogOut />
            </button>
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpen}
              target={"Tooltip-Logout"}
              toggle={toggle}
            >
              Logout
            </Tooltip>
          </li>
        </ul>
      </div>
    </div>
  );
}
