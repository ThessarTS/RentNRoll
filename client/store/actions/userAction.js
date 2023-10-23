import {
  CATEGORIES_FETCH_SUCCESS,
  PROFILES_FETCH_SUCCESS,
  TRENDING_FETCH_FAIL,
} from "./actionType";
import axios from "axios";

const baseUrl =
  "https://f231-2001-448a-6021-5c1-7d07-8ba0-4ab-1d75.ngrok-free.app";

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
  console.log(value, "<< action");
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
