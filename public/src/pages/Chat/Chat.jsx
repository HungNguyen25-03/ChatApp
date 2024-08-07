import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import axios from "axios";
import { host } from "../../utils/APIRoutes";
import Contact from "./Contact/Contact";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ChatContainer from "./ChatContainer/ChatContainer";
import Welcome from "../../components/Welcome/Welcome";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const [allContacts, setAllContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("chat-app-user"));

  useEffect(() => {
    if (user) {
      socket.current = io(`${host}`);
      socket.current.on("connect", () => {
        console.log("Connected to server with ID:", socket.id);
      });
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      nav("/login");
    } else {
      getContacts();
    }
  }, []);

  const getContacts = async () => {
    try {
      const data = await axios
        .get(`${host}/users/getAllUser/${user._id}`)
        .then((res) => res.data)
        .catch((err) => err);

      setAllContacts(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chatContainer">
      <ToastContainer />
      <div className="container">
        <Contact contacts={allContacts} changeChat={handleChangeChat} />
        {currentChat === undefined ? (
          <Welcome currentUser={user} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={user}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}
