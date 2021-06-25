import React from "react";
import { Button, Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
import { useForm } from "react-hook-form";
import {ChatContext} from '../../context/chat.context'
import { v4 as uuidv4 } from "uuid";
export default function ChatFooter() {
  const [message, setMessage] = React.useState("");
  const {state, actions} = React.useContext(ChatContext);
  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log(message);
    if(message.length > 0){
      let request = {
        roomId: localStorage.getItem("roomId"),
        message:{
          id: uuidv4(),
          userId: localStorage.getItem("userId"),
          name: localStorage.getItem("name"),
          avatar: localStorage.getItem("avatar"),
          message: message,
        }
      }
      actions.sendMessage(request);
    }
    setMessage("");
  };
  return (
    <div className="chat-footer">
      <form onSubmit={e => handleSendMessage(e)}>
        <div>
          <Button color="light" className="mr-3" title="Emoji">
            <FeatherIcon.Smile />
          </Button>
        </div>
        <Input
          type="text"   
          value={message}
          className="form-control"
          placeholder="Write a message."
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="form-buttons">
          <Button type="button" color="primary" onClick={handleSendMessage}>
            <FeatherIcon.Send />
          </Button>
        </div>
      </form>
    </div>
  );
}
