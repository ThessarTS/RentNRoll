import { VEHICLE_FETCH_FAIL, VEHICLE_FETCH_REQUEST, VEHICLE_FETCH_SUCCESS } from "./actionType";
import axios from "axios";
const baseUrl = "https://96fa-114-122-140-242.ngrok-free.app/vehicles/";

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
      const { data } = await axios.get(baseUrl);
      dispatch(vehicleFetchSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(vehicleFetchFail(error));
    }
  };
};
