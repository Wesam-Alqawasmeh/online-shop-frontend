import axios from "axios";
import cookie from "react-cookies";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${cookie.load("token")}`,
  },
});
