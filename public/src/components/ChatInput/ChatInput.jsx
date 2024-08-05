import React, { useState } from "react";
import "./ChatInputStyle.scss";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (event, emoji) => {
    let msg = message;
    msg += event.emoji;
    console.log(event);

    setMessage(msg);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage("");
    }
  };

  return (
    <div className="chatInput-container">
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmoji && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className="input-container"
        onSubmit={(e) => {
          sendChat(e);
        }}
      >
        <input
          type="text"
          placeholder="Type your text here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
