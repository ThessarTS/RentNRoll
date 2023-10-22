import axios from "axios";
import { CATEGORIES_FETCH_SUCCESS } from "../actionType/actionType";

export const categoriesFetchSuccess = (payload) => {
  return { type: CATEGORIES_FETCH_SUCCESS, payload };
};

const baseUrl =
  "https://003e-2001-448a-6021-5c1-1ce5-bdb-d488-5ae0.ngrok-free.app";

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/categories",
        method: "GET",
      });
      // console.log(data);
      dispatch(categoriesFetchSuccess(data));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
