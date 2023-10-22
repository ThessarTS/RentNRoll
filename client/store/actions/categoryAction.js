import { CATEGORIES_FETCH_SUCCESS, TRENDING_FETCH_FAIL } from "./actionType";
import axios from "axios";

const baseUrl =
  "https://f231-2001-448a-6021-5c1-7d07-8ba0-4ab-1d75.ngrok-free.app";

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
