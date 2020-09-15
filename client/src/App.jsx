import React, { useEffect, useState } from "react";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./axios";

import { Sidebar, Chat } from "./Components";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("59f674bc8c1cf20e8f33", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });
  }, [messages]);
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
