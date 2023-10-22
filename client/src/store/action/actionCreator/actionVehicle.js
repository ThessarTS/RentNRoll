import axios from "axios";
import {
  CATEGORIES_FETCH_SUCCESS,
  DETAIL_FETCH_SUCCESS,
  TRENDING_FETCH_SUCCESS,
} from "../actionType/actionType";

export const trendingFetchSuccess = (payload) => {
  return { type: TRENDING_FETCH_SUCCESS, payload };
};
export const detailFetchSuccess = (payload) => {
  return { type: DETAIL_FETCH_SUCCESS, payload };
};

const baseUrl =
  "https://003e-2001-448a-6021-5c1-1ce5-bdb-d488-5ae0.ngrok-free.app";

export const fetchTrendingVehicle = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/trending",
        method: "GET",
      });
      dispatch(trendingFetchSuccess(data));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchDetail = (id) => {
  return async (dispatch) => {
    console.log(id);
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
