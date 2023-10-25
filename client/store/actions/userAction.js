import { ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, PROFILES_FETCH_REQUEST, PROFILES_FETCH_SUCCESS } from "./actionType";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorAlert, successAlert } from "../../src/helpers/alert";
import { fetchMyRent, fetchMyVehicle } from "./vehicleAction";
import { fetchReviewByUser } from "./reviewAction";

const baseUrl = "https://5ced-118-96-109-120.ngrok-free.app";

// import { baseUrl } from "./categoryAction";

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
      throw error.response.data.message;
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
      throw error.response.data.message;
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
      throw error.response.data.message;
    }
  };
};

// FETCH PROFILES
export const getUser = () => {
  return async (dispatch) => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("userNotFound");
      }

      dispatch(fetchProfile(access_token));
      dispatch(fetchMyRent(access_token));
      dispatch(fetchReviewByUser(access_token));
      dispatch(fetchMyVehicle(access_token));
    } catch (error) {
      console.log(error, "user not found action");
    }
  };
};

export const profilesFetchSuccess = (payload) => {
  return { type: PROFILES_FETCH_SUCCESS, payload };
};

export const profilesFetchRequest = () => {
  return { type: PROFILES_FETCH_REQUEST };
};

export const fetchProfile = (value) => {
  return async (dispatch) => {
    dispatch(profilesFetchRequest());
    try {
      const { data } = await axios({
        url: baseUrl + "/profiles",
        method: "GET",
        headers: {
          access_token: value,
        },
      });

      dispatch(profilesFetchSuccess(data));
    } catch (error) {
      console.log(error, "ini loh");
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
      successAlert("Success Logout");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };
};

// add end edit profile
export const addProfileRequest = () => {
  return { type: ADD_PROFILE_REQUEST };
};
export const addProfileSuccess = () => {
  return { type: ADD_PROFILE_SUCCESS };
};

export const addProfile = (value, access_token) => {
  return async (dispatch) => {
    dispatch(addProfileRequest());
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

      dispatch(addProfileSuccess());

//       await dispatch(
//         fetchProfile({
//           access_token: access_token,
//         })
//       );

      return data;
    } catch (error) {
      throw error.response.data;
    }
  };
};

export const editProfile = (value, access_token) => {
  console.log(access_token, "ini di edit");
  return async (dispatch) => {
    dispatch(addProfileRequest());
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

      dispatch(fetchProfile(access_token));

      return data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  };
};
