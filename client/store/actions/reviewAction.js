import axios from "axios";
import { errorAlert, successAlert } from "../../src/helpers/alert";
import { ADD_REVIEW_SUCCESS, FETCH_REVIEW_BY_USER_SUCCESS, FETCH_REVIEW_BY_VEHICLE_SUCCESS } from "./actionType";
const baseUrl = "https://apiku.thessarts.site";

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

export const fetchReviewByVehicle = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/reviews/" + id,
      });
      dispatch(fetchReviewByVehicleSuccess(data));
    } catch (error) {
      console.log("disini");
      errorAlert(error.response.data.message);
    }
  };
};

export const addReviewSuccess = () => {
  return { type: ADD_REVIEW_SUCCESS };
};

export const addReview = (inputReview, access_token) => {
  console.log(access_token);
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
      dispatch(fetchReviewByUser(access_token));
      dispatch(fetchReviewByVehicle(inputReview.VehicleId, access_token));
    } catch (error) {
      errorAlert(error.response.data.message);
    }
  };
};
