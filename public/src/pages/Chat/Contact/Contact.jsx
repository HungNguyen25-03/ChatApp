import React, { useEffect, useState } from "react";
import "./ContactStyle.scss";

export default function Contact({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const currentUser = JSON.parse(localStorage.getItem("chat-app-user"));

  return (
    <div className="contact-container">
      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              key={index}
              onClick={() => {
                setCurrentSelected(index);
                changeChat(contact);
              }}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatar}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{contact.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUser.avatar}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h3>{currentUser.name}</h3>
        </div>
      </div>
    </div>
  );
}
