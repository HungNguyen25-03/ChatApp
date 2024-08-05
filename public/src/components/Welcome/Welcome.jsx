import React from "react";

export default function Welcome({ currentUser }) {
  return (
    <div className="welcome-container">
      <h1>
        Welcome, <span>{currentUser.name}!</span>
      </h1>
      <h3>Please select a chat to Start</h3>
    </div>
  );
}
