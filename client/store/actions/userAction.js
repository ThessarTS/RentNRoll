import {
  CATEGORIES_FETCH_SUCCESS,
  PROFILES_FETCH_SUCCESS,
  TRENDING_FETCH_FAIL,
} from "./actionType";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "./categoryAction";

// const baseUrl = "https://1545-118-96-109-120.ngrok-free.app";

export const registerHandler = (value) => {
  return async () => {
    try {
      const { data } = await axios({
        url: baseUrl + "/register",
        method: "POST",
        data: value,
      });
      return data;
    } catch (error) {
      // console.log(error.response.data);
      throw error.response.data;
    }
  };
};

export const createOtp = (value) => {
  return async () => {
    try {
      const { data } = await axios({
        url: baseUrl + "/otp",
        method: "POST",
        data: value,
      });
      return data;
    } catch (error) {
      // console.log(error.response.data);
      throw error.response.data;
    }
  };
};

export const handleLogin = (value) => {
  return async () => {
    try {
      const { data } = await axios({
        url: baseUrl + "/login",
        method: "POST",
        data: value,
      });
      return data;
    } catch (error) {
      throw error.response.data;
    }
  };
};

// FETCH PROFILES
export const getUser = () => {
  return async (dispatch) => {
    try {
      const newUser = await AsyncStorage.getItem("access_token");
      if (!newUser) {
        throw new Error("userNotFound");
      }
      const newValue = {
        access_token: newUser,
      };
      dispatch(fetchProfile(newValue));
    } catch (error) {
      console.log(error);
    }
  };
};

export const profilesFetchSuccess = (payload) => {
  return { type: PROFILES_FETCH_SUCCESS, payload };
};

export const fetchProfile = (value) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/profiles",
        method: "GET",
        headers: value,
      });
      dispatch(profilesFetchSuccess(data));
    } catch (error) {
      throw error.response.data;
    }
  };
};

export const handleLogout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("access_token");
      dispatch({
        type: "logout/success",
      });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };
};

export const addProfile = (value, access_token) => {
  console.log(value, "<<<<action");
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/profiles",
        method: "POST",
        headers: {
          access_token: access_token,
        },
        "Content-Type": "multipart/form-data",
        data: value,
      });
      return data;
    } catch (error) {
      throw error.response.data;
    }
  };
};

export const editProfile = (value, access_token) => {
  console.log(value, access_token, "<<<<action");
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/profiles",
        method: "PUT",
        headers: {
          access_token: access_token,
        },
        "Content-Type": "multipart/form-data",
        data: value,
      });
      console.log("msuk sini");
      dispatch(
        fetchProfile({
          access_token: access_token,
        })
      );
      return data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  };
};
