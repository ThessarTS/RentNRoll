import { errorAlert } from "../../src/helpers/alert";
import { CATEGORIES_FETCH_SUCCESS } from "./actionType";
import axios from "axios";

export const baseUrl = "https://apiku.thessarts.site";
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
