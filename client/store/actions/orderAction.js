import axios from "axios";
import {
  ORDER_FETCH_BY_VEHICLE_ID_REQUEST,
  ORDER_FETCH_BY_VEHICLE_ID_SUCCESS,
  ORDER_FETCH_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
} from "./actionType";
import { errorAlert } from "../../src/helpers/alert";

const baseUrl = "https://d467-118-96-109-120.ngrok-free.app";

// import { baseUrl } from "./categoryAction";

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
      errorAlert(error.response.data.message);
    }
  };
};

export const fetchOrderByVehicleIdRequest = () => {
  return { type: ORDER_FETCH_BY_VEHICLE_ID_REQUEST };
};

export const fetchOrderByVehicleIdSuccess = (payload) => {
  return { type: ORDER_FETCH_BY_VEHICLE_ID_SUCCESS, payload };
};

export const fetchOrderByVehicleId = (id) => {
  return async (dispatch) => {
    dispatch(fetchOrderByVehicleIdRequest());
    try {
      const { data } = await axios({
        url: baseUrl + "/orders/vehicle/" + id,
      });
      dispatch(fetchOrderByVehicleIdSuccess(data));
    } catch (error) {
      console.log(error);
      errorAlert(error.response.data.message);
    }
  };
};
