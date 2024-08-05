import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import "./LogoutStyle.scss";

export default function Logout() {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };
  return (
    <button className="logout-btn" onClick={handleLogout}>
      <BiPowerOff />
    </button>
  );
}
