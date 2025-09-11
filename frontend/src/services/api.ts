import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:3000/api",
  withCredentials: true,
});

// Blog Posts
export const getAllPosts = () => API.get("/posts");
