import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";

import "./Chat.css";

function Chat({ messages }) {
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-user-info">
          <h2>Name</h2>
          <p>last seen 03:00pm</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <p className={`chat-message ${message.recieved && 'chat-sender'}`}>
            <span className="chat-name">{message.name}</span>
            <span className="chat-time"> {message.timestamp} </span>
            <span className="message" style={{ display: "block" }}>
              {message.message}
            </span>
          </p>
        ))}

        {/* <p className="chat-message chat-sender">
          <span className="chat-name">Ganesh</span>
          <span className="chat-time"> {new Date().toDateString()} </span>
          <span className="message" style={{ display: "block" }}>
            Hi ra asayam ekkadunnav ra beppam
          </span>
        </p> */}
      </div>
      <div className="chat-footer">
        <EmojiEmotionsIcon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button>
            <SendIcon />
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
