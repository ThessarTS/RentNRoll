import {
  TRENDING_FETCH_FAIL,
  TRENDING_FETCH_REQUEST,
  TRENDING_FETCH_SUCCESS,
  VEHICLE_FETCH_BY_ID_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_REQUEST,
  VEHICLE_FETCH_SUCCESS,
} from "./actionType";
import axios from "axios";

const baseUrl =
  "https://5a7c-2001-448a-6021-5c1-d3d5-fb4c-3050-5644.ngrok-free.app";

// FETCH VEHICLES
export const vehicleFetchRequest = () => {
  return { type: VEHICLE_FETCH_REQUEST };
};

export const vehicleFetchSuccess = (payload) => {
  return { type: VEHICLE_FETCH_SUCCESS, payload };
};

export const vehicleFetchFail = (payload) => {
  return { type: VEHICLE_FETCH_FAIL, payload };
};

export const fetchVehicles = () => {
  return async (dispatch) => {
    dispatch(vehicleFetchRequest());
    try {
      const { data } = await axios({
        url: baseUrl + "/vehicles",
      });
      dispatch(vehicleFetchSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(vehicleFetchFail(error));
    }
  };
};
// END FETCH VEHICLES

// FETCH VEHICLE DETAIL

export const detailFetchSuccess = (payload) => {
  return { type: VEHICLE_FETCH_BY_ID_SUCCESS, payload };
};

export const fetchDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/vehicles/" + id,
        method: "GET",
      });
      dispatch(detailFetchSuccess(data));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

// END FETCH VEHICLE BY ID

// TRENDING

export const trendingFetchRequest = () => {
  return { type: TRENDING_FETCH_REQUEST };
};

export const trendingFetchSuccess = (payload) => {
  return { type: TRENDING_FETCH_SUCCESS, payload };
};

export const trendingFetchFail = (payload) => {
  return { type: TRENDING_FETCH_FAIL, payload };
};

export const fetchTrending = () => {
  return async (dispatch) => {
    dispatch(trendingFetchRequest());
    try {
      const { data } = await axios({
        url: baseUrl + "/trending",
      });
      dispatch(trendingFetchSuccess(data));
    } catch (error) {
      dispatch(trendingFetchFail(error));
    }
  };
};
// END TRENDING
// ADD VEHICLE
export const addVehicleSuccess = (payload) => {
  return { type: ADD_FETCH_SUCCESS, payload };
};

export const addVehicle = (value, access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/vehicles",
        method: "POST",
        data: value,
        "Content-Type": "multipart/form-data",
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchVehicles());
      return data;
    } catch (error) {
      throw error.response.data;
    }
  };
};
