import React from "react";
import { Button, Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
export default function ChatFooter() {
  return (
    <div className="chat-footer">
      <form>
        <div>
          <Button color="light" className="mr-3" title="Emoji">
            <FeatherIcon.Smile />
          </Button>
        </div>
        <Input
          type="text"
          className="form-control"
          placeholder="Write a message."
        />
        <div className="form-buttons">
          <Button color="primary">
            <FeatherIcon.Send />
          </Button>
        </div>
      </form>
    </div>
  );
}
