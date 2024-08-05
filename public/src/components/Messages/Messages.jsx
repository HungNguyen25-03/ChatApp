import React, { useEffect, useRef } from "react";
import "./MessagesStyle.scss";

export default function Messages({ messages }) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="messages-container">
      {messages.map((msg, index) => {
        return (
          <div key={index}>
            <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                <p>{msg.content}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
