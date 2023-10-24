import { errorAlert } from "../../src/helpers/alert";
import { CATEGORIES_FETCH_SUCCESS } from "./actionType";
import axios from "axios";

export const baseUrl =
  "https://76fe-2001-448a-6021-5c1-479e-df66-2222-ad93.ngrok-free.app";

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
      errorAlert(error.response.data.message);
    }
  };
};
// END FETCH CATEGORIES
