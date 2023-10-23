import { CATEGORIES_FETCH_SUCCESS, TRENDING_FETCH_FAIL } from "./actionType";
import axios from "axios";

const baseUrl = "https://4ed3-114-122-143-178.ngrok-free.app";

// FETCH CATEGORIES
export const categoriesFetchSuccess = (payload) => {
  return { type: CATEGORIES_FETCH_SUCCESS, payload };
};

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/categories",
      });
      dispatch(categoriesFetchSuccess(data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
// END FETCH CATEGORIES
