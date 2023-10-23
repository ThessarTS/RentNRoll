import {
  CATEGORIES_FETCH_SUCCESS,
  PROFILES_FETCH_SUCCESS,
  TRENDING_FETCH_FAIL,
} from "./actionType";
import axios from "axios";

const baseUrl =
  "https://0dba-2001-448a-6021-5c1-d3d5-fb4c-3050-5644.ngrok-free.app";

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
      console.log(data);
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
      // console.log(data);
      dispatch(profilesFetchSuccess(data));
    } catch (error) {
      throw error.response.data;
    }
  };
};

// END FETCH CATEGORIES
