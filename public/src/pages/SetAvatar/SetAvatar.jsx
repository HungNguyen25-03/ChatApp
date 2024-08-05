import React, { useEffect, useState } from "react";
import "./SetAvatarStyle.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { host } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function SetAvatar() {
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seletedAvatar, setSelectedAvatar] = useState(null);
  const nav = useNavigate();
  const api = "https://api.multiavatar.com/45678945";
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      nav("/login");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(response.data);
          data.push(buffer.toString("base64"));
          await delay(1000); // delay of 1 second between requests
        } catch (error) {
          console.error("Error fetching image:", error);
          // Handle error (e.g., retry mechanism or break loop)
          break;
        }
      }
      setAvatar(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSetProfilePicture = () => {
    if (seletedAvatar === null) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const data = axios
        .post(`${host}/users/setAvatar/${user._id}`, {
          avatar: avatar[seletedAvatar],
        })
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("Profile picture updated successfully", toastOptions);
            user.avatar = avatar[seletedAvatar];
            localStorage.setItem("chat-app-user", JSON.stringify(user));
            nav("/chat");
          } else {
            toast.error("Failed to set profile picture", toastOptions);
          }
        });
    }
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div className="setAvatar-container">
            <div className="title">
              <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatar.map((image, index) => {
                return (
                  <div
                    className={`avatar ${
                      seletedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${image}`}
                      alt={image}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button className="submit-btn" onClick={handleSetProfilePicture}>
              Set as Profile picture
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="setAvatar-container">
            <RingLoader color="#f300e2" />
          </div>
        </>
      )}
    </>
  );
}
