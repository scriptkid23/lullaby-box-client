import React, { useEffect, useState } from "react";
import ChatHeader from "./chat-header.component";
import ChatFooter from "./chat-footer.component";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ChatContext } from "../../context/chat.context";
import LottieGenerator from "../components/lottie-generator.component";

export default function Chat() {
  const [scrollEl, setScrollEl] = useState();
  const { state } = React.useContext(ChatContext);
  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  }, [scrollEl]);
  useEffect(() => {
    if (scrollEl) {
      setTimeout(() => {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }, 100);
    }
  });

  return (
    <div className="chat open">
      <LottieGenerator/>
      <React.Fragment>
        <ChatHeader room={state.room} />

        <PerfectScrollbar containerRef={(ref) => setScrollEl(ref)}>
          <div className="chat-body">
            <div className="messages">
              {state.messages.map((value, index) => {
                return (
                  <div
                    key={value.id}
                    className={`message-item ${
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
                      </div>
                    </div>
                    <div className="message-content">{value.message}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </PerfectScrollbar>

        <ChatFooter />
      </React.Fragment>
    </div>
  );
}
