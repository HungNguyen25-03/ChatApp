import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.scss";
import { loginRoute } from "../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../utils/APIService";
export default function Login() {
  const nav = useNavigate();
  const [values, setVales] = useState({
    name: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(loginRoute, values);
    if (data.status === 200) {
      console.log(data);
      localStorage.setItem("token", data.result.accessToken);
      localStorage.setItem("chat-app-user", JSON.stringify(data.result.user));

      toast.success(data.message);
      if (data.result.user.avatar === "") {
        nav("/setAvatar");
      } else {
        nav("/chat");
      }
    } else {
      console.log(data, "data");
      for (const key in data.errors) {
        toast.error(data.errors[key].msg, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  };
  const handleChange = (e) => {
    setVales({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="LoginContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
