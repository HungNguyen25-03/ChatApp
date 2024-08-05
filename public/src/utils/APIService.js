import axios from "axios";
import { host } from "./APIRoutes";

export async function register(registerRoute, userInfo) {
  const { name, email, password, confirm_password } = userInfo;
  return await fetch(registerRoute, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, confirm_password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
}

export async function login(loginRoute, userInfo) {
  const { name, password } = userInfo;
  const data = await fetch(loginRoute, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  })
    .then((res) => res.json())
    .catch((err) => err.json());
  return data;
}
