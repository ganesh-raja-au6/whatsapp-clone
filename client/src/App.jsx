import React from "react";
import "./App.css";

import { Sidebar, Chat } from "./Components";

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
