import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import SetAvatar from "./pages/SetAvatar/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/chat" element={<Chat></Chat>}></Route>
        <Route path="/setAvatar" element={<SetAvatar></SetAvatar>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
