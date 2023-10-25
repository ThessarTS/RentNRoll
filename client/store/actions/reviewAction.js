import axios from "axios";
import { errorAlert, successAlert } from "../../src/helpers/alert";
import { ADD_REVIEW_SUCCESS, FETCH_REVIEW_BY_USER_SUCCESS, FETCH_REVIEW_BY_VEHICLE_SUCCESS } from "./actionType";
const baseUrl = "https://d467-118-96-109-120.ngrok-free.app";

export const fetchReviewByUserSuccess = (payload) => {
  return { type: FETCH_REVIEW_BY_USER_SUCCESS, payload };
};

export const fetchReviewByUser = (access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/reviews",
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchReviewByUserSuccess(data));
    } catch (error) {
      errorAlert(error.response.data.message);
    }
  };
};

export const fetchReviewByVehicleSuccess = (payload) => {
  return { type: FETCH_REVIEW_BY_VEHICLE_SUCCESS, payload };
};

export const fetchReviewByVehicle = (id, access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/reviews/" + id,
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchReviewByVehicleSuccess(data));
    } catch (error) {
      errorAlert(error.response.data.message);
    }
  };
};

export const addReviewSuccess = () => {
  return { type: ADD_REVIEW_SUCCESS };
};

export const addReview = (inputReview, access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        url: baseUrl + "/reviews/" + inputReview.VehicleId,
        headers: {
          access_token: access_token,
        },
        data: inputReview,
      });
      successAlert(data.message);
      dispatch(fetchReviewByUser(inputReview.UserId, access_token));
      dispatch(fetchReviewByUser(inputReview.VehicleId, access_token));
    } catch (error) {
      errorAlert(error.response.data.message);
    }
  };
};
