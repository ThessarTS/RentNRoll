import {
  TRENDING_FETCH_FAIL,
  TRENDING_FETCH_REQUEST,
  TRENDING_FETCH_SUCCESS,
  VEHICLE_FETCH_BY_ID_FAIL,
  VEHICLE_FETCH_BY_ID_REQUEST,
  VEHICLE_FETCH_BY_ID_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_REQUEST,
  VEHICLE_FETCH_SUCCESS,
} from "./actionType";
import axios from "axios";

const vehicleBaseURL = "https://87dd-114-122-169-6.ngrok-free.app/vehicles/";
const trendingBaseURL = "https://87dd-114-122-169-6.ngrok-free.app/trending/";

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
      const { data } = await axios.get(vehicleBaseURL);
      dispatch(vehicleFetchSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(vehicleFetchFail(error));
    }
  };
};
// END FETCH VEHICLES

// FETCH VEHICLE BY ID
export const vehicleFetchByIdRequest = () => {
  return { type: VEHICLE_FETCH_BY_ID_REQUEST };
};

export const vehicleFetchByIdSuccess = (payload) => {
  return { type: VEHICLE_FETCH_BY_ID_SUCCESS, payload };
};

export const vehicleFetchByIdFail = (payload) => {
  return { type: VEHICLE_FETCH_BY_ID_FAIL, payload };
};

export const fetchVehicleById = (id) => {
  return async (dispatch) => {
    dispatch(vehicleFetchByIdRequest());
    try {
      const { data } = await axios.get(vehicleBaseURL + id);
      dispatch(vehicleFetchByIdSuccess(data));
    } catch (error) {
      dispatch(vehicleFetchByIdFail(error));
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
      const { data } = await axios.get(trendingBaseURL);
      dispatch(trendingFetchSuccess(data));
    } catch (error) {
      dispatch(trendingFetchFail(error));
    }
  };
};

// END TRENDING
