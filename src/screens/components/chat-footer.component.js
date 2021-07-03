import React from "react";
import { Button, Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
import { ChatContext } from "../../context/chat.context";
import { v4 as uuidv4 } from "uuid";
import { toArray } from "react-emoji-render";
const parseEmojis = (value) => {
  const emojisArray = toArray(value);

  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === "string") {
      return previous + current;
    }
    return previous + current.props.children;
  }, "");

  return newValue;
};
export default function ChatFooter() {
  const [message, setMessage] = React.useState("");
  const { state, actions } = React.useContext(ChatContext);
  const handleSetMessage = (value) => {
    setMessage(value);
    if (value.length > 0) {
      actions.sendIsTyping({
        roomId: localStorage.getItem("roomId"),
        sender: localStorage.getItem("userId"),
        isTyping: true,
      });
    } else {
      actions.sendIsTyping({
        roomId: localStorage.getItem("roomId"),
        sender: localStorage.getItem("userId"),
        isTyping: false,
      });
    }
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      let request = {
        roomId: localStorage.getItem("roomId"),
        message: {
          id: uuidv4(),
          userId: localStorage.getItem("userId"),
          name: localStorage.getItem("name"),
          avatar: localStorage.getItem("avatar"),
          message: parseEmojis(message),
          replyId: state.replyId,
          replyMessage: state.replyMessage,
        },
      };
      actions.sendMessage(request);
    }
    setMessage("");
  };
  const handleFocus = (e) => {
    actions.sendIsSeen({
      roomId: localStorage.getItem("roomId"),
      participant: {
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
      },
    });
  };
  return (
    <div className="chat-footer">
      <form onSubmit={(e) => handleSendMessage(e)}>
        <ul className="chat-footer-input-container form-control">
          {state.replyId && (
            <li
              className="reply-old-message badge badge-primary pointer"
              onClick={actions.removeTagOldMessage}
            >
              <span>
                {state.replyMessage.length > 12
                  ? state.replyMessage.substr(0, 12) + "..."
                  : state.replyMessage}
              </span>
            </li>
          )}
          <input
            type="text"
            value={message}
            onFocus={handleFocus}
            className="chat-footer-input"
            placeholder="Write a message."
            onChange={(e) => handleSetMessage(e.target.value)}
          />
        </ul>
        <div className="form-buttons">
          <Button type="button" color="primary" onClick={handleSendMessage}>
            <FeatherIcon.Send />
          </Button>
        </div>
      </form>
    </div>
  );
}
