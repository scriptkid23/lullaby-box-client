import React, { useEffect, useState } from "react";
import ChatHeader from "./chat-header.component";
import ChatFooter from "./chat-footer.component";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ChatContext } from "../../context/chat.context";
import LottieGenerator from "../components/lottie-generator.component";
import Typing from './typing.component'
export default function Chat() {
  const [scrollEl, setScrollEl] = useState();
  const { state } = React.useContext(ChatContext);
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
  return (
    <div className="chat open">
      {state.effectName === 'love' && <LottieGenerator path="https://assets8.lottiefiles.com/datafiles/nZgj7wTd56UtH6m/data.json"/>}
      {state.effectName === 'hpbd' && <LottieGenerator path="https://assets2.lottiefiles.com/packages/lf20_u4yrau.json"/>}
      {state.effectName === 'loki' && <LottieGenerator path="https://assets10.lottiefiles.com/packages/lf20_ocrcnofw.json"/>}
      <React.Fragment>
        <ChatHeader room={state.room} roomIcon={state.roomIcon}/>
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
            {state.isTyping && state.sender !== state.owner && <Typing/>}
            </div>
          </div>
        </PerfectScrollbar>
        <ChatFooter />
      </React.Fragment>
    </div>
  );
}
