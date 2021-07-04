import React, { useEffect, useState } from "react";
import ChatHeader from "./chat-header.component";
import ChatFooter from "./chat-footer.component";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ChatContext } from "../../context/chat.context";
import Typing from "./typing.component";
import LottieEffect from "./effect.component";
import SendImage from "./send-image.component";
import { Image } from "react-bootstrap";
export default function Chat() {
  const [scrollEl, setScrollEl] = useState();
  const { state, actions } = React.useContext(ChatContext);

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  }, [scrollEl, state.isTyping, state.messages]);
  // useEffect(() => {
  //   if (scrollEl) {
  //     scrollEl.scrollTop = scrollEl.scrollHeight;
  //   }
  // });
  useEffect(() => {
    var container = document.getElementById("chat-body-container");

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    container.addEventListener("drop", (event) => {
      const files = event.dataTransfer.files;
      actions.setImageFile(files[0]);
      event.preventDefault();
      event.stopPropagation();
    });
  }, []);
  const exportSeen = (data) => {
    if (data.length < 4) {
      return data.map((value, index) => value.name).join(", ");
    } else {
      let result = [];
      for (let i in data) {
        if (i < 3) {
          result.push(data[i].name);
        }
      }
      return result.join(", ") + "...";
    }
  };
  return (
    <div className="chat open">
      <LottieEffect
        effect={state.effect}
        actions={actions}
        effects={state.effects}
        effectName={state.effectName}
      />
      <SendImage
        file={state.imageFile}
        actions={actions}
        replyId={state.replyId}
        replyMessage={state.replyMessage}
      />
      <React.Fragment>
        <ChatHeader room={state.room} roomIcon={state.roomIcon} />

        <PerfectScrollbar
          containerRef={(ref) => setScrollEl(ref)}
          id="chat-body-container"
        >
          <div className="chat-body">
            <div className="messages">
              {state.messages.map((value, index) => {
                return (
                  <div
                    onClick={() =>
                      actions.replyOldMessage({
                        id: value.id,
                        message: value.message,
                      })
                    }
                    key={value.id}
                    className={`message-item pointer ${
                      state.owner === value.userId ? "outgoing-message" : " "
                    }`}
                  >
                    <div className="message-avatar">
                      <figure className="avatar">
                        <img
                          src={value.avatar}
                          className="rounded-circle"
                          alt="avatar"
                        />
                      </figure>
                      <div>
                        <h5>{value.name}</h5>
                        {state.lastMessage.id === value.id &&
                          state.lastMessage.seenby.length > 0 && (
                            <span className="time text-wrap text-break">
                              seen by {exportSeen(state.lastMessage.seenby)}
                            </span>
                          )}
                      </div>
                    </div>

                    {value.type === "text" && (
                      <div className="message-content">
                        {value.replyId.length > 0 && (
                          <>
                            <span className="reply-message-content">
                              {value.replyMessage.length > 12
                                ? value.replyMessage.substr(0, 12) + "..."
                                : value.replyMessage}
                            </span>
                            <br />
                          </>
                        )}

                        {value.message}
                      </div>
                    )}
                    {value.type === "image" && (
                      <figure>
                        <Image
                          className={`w-25 ${
                            state.owner === value.userId && "float-right"
                          }`}
                          src={value.message}
                          fluid
                          rounded
                          alt="message-image"
                        />
                      </figure>
                    )}
                  </div>
                );
              })}
              {state.isTyping && state.sender !== state.owner && <Typing />}
            </div>
          </div>
        </PerfectScrollbar>
        <ChatFooter />
      </React.Fragment>
    </div>
  );
}
