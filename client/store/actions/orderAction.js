import axios from "axios";
import { ORDER_FETCH_FAIL, ORDER_FETCH_REQUEST, ORDER_FETCH_SUCCESS } from "./actionType";

const baseUrl = "https://0187-2001-448a-1021-5f44-11c3-740a-ea80-49d6.ngrok-free.app";

export const orderFetchReq = () => {
  return { type: ORDER_FETCH_REQUEST };
};

export const orderFetchSuccess = (payload) => {
  return { type: ORDER_FETCH_SUCCESS, payload };
};

export const orderFetchFail = (payload) => {
  return { type: ORDER_FETCH_FAIL, payload };
};

export const fetchOrders = (access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/orders",
        headers: {
          access_token: access_token,
        },
      });
      dispatch(orderFetchSuccess(data));
    } catch (error) {
      dispatch(orderFetchFail(error));
    }
  };
};
