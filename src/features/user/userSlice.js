import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import base64 from "base-64";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../../assets/api";
import cookie from "react-cookies";

const initialState = {
  user: {
    name: null,
    email: null,
    id: null,
  },
  status: "notAuth",
  error: null,
};

// Sign-In API
const signInApi = async (username, password) => {
  return await axios.post(
    "http://localhost:5000/api/users/signin",
    {},
    {
      headers: {
        Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

// Sign-Up API
const signUpApi = async (body) => {
  return await axios.post("http://localhost:5000/api/users/signup", body);
};

export const signIn = createAsyncThunk(
  "user/signin",
  async ({ username, password }) => {
    try {
      const response = await signInApi(username, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged In Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Invalid Login",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  }
);

export const logIn = createAsyncThunk("user/signin", async () => {
  const response = await api.post("/users/log-in");
  return response.data;
});

export const signUp = createAsyncThunk("user/signin", async (body) => {
  try {
    const response = await signUpApi(body);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Account Created Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    return response.data;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: "Try Again Please",
      icon: "error",
      confirmButtonText: "Close",
    });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = "notAuth";
      state.error = null;
      cookie.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        cookie.save("token", action.payload.token);
        state.status = "auth";
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error;
        state.user = initialState.user;
        state.status = "rejected";
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
