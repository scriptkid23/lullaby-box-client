import React, { useEffect, useState } from "react";
import ChatHeader from "./chat-header.component";
import ChatFooter from "./chat-footer.component";
import PerfectScrollbar from "react-perfect-scrollbar";
export default function Chat() {
  const [inputMsg, setInputMsg] = useState("");

  const [scrollEl, setScrollEl] = useState();
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
  console.log("Chat render");
  const MessagesView = (props) => {};
  return (
    <div className="chat open">
      <React.Fragment>
        <ChatHeader />
        <PerfectScrollbar containerRef={(ref) => setScrollEl(ref)}>
          <div className="chat-body">
            <div className="messages">{null}</div>
          </div>
        </PerfectScrollbar>
        <ChatFooter />
      </React.Fragment>
    </div>
  );
}
