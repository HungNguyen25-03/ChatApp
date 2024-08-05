import React, { useEffect, useRef, useState } from "react";
import "./ChatContainerStyle.scss";
import Logout from "../../../components/Logout/Logout";
import ChatInput from "../../../components/ChatInput/ChatInput";
import Messages from "../../../components/Messages/Messages";
import axios from "axios";
import { host } from "../../../utils/APIRoutes";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .post(`${host}/message/getAllMessage`, {
        from: currentUser._id,
        to: currentChat._id,
      })
      .then((res) => {
        setMessages(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentChat]);

  const handleSendMsg = (message) => {
    axios
      .post(`${host}/message/addMessage`, {
        from: currentUser._id,
        to: currentChat._id,
        content: message,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    socket.current.emit("send-message", {
      from: currentUser._id,
      to: currentChat._id,
      content: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, content: message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (msg) => {
        setArrivalMessage({ fromSelf: false, content: msg });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <>
      {currentChat ? (
        <>
          <div className="chatContainer-container">
            <div className="chat-header">
              <div className="user-detail">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatar}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{currentChat.name}</h3>
                </div>
              </div>
              <Logout />
            </div>

            <Messages messages={messages} />

            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
