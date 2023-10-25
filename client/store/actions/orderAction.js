import axios from "axios";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDERBYID_FETCH_REQUEST,
  ORDERBYID_FETCH_SUCCESS,
  ORDER_FETCH_BY_VEHICLE_ID_REQUEST,
  ORDER_FETCH_BY_VEHICLE_ID_SUCCESS,
  ORDER_FETCH_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
} from "./actionType";
import { errorAlert } from "../../src/helpers/alert";
const baseUrl = "https://5ced-118-96-109-120.ngrok-free.app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchProfile } from "./userAction";

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

export const createOrderReq = () => {
  return { type: CREATE_ORDER_REQUEST };
};

export const createOrderSuccess = (payload) => {
  return { type: CREATE_ORDER_SUCCESS, payload };
};

export const createOrderFail = (payload) => {
  return { type: CREATE_ORDER_FAIL, payload };
};

export const createOrderVehicle = (value, id) => {
  return async (dispatch) => {
    dispatch(createOrderReq());
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        url: baseUrl + "/orders/" + id,
        method: "POST",
        data: value,
        headers: {
          access_token: access_token,
        },
      });
      dispatch(createOrderSuccess(data));
      return data;
    } catch (error) {
      console.log(error);
      errorAlert(error.response.data.message);
    }
  };
};

export const midtransPayment = (id) => {
  return async (dispatch) => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        url: baseUrl + "/midtrans-token/" + id,
        method: "POST",
        data: 10,
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchProfile({ access_token: access_token }));
      return data;
    } catch (error) {
      console.log(error);
      errorAlert(error.response.data.message);
    }
  };
};

export const fetchOrderByIdRequest = () => {
  return { type: ORDERBYID_FETCH_REQUEST };
};

export const fetchOrderByIdSuccess = (payload) => {
  return { type: ORDERBYID_FETCH_SUCCESS, payload };
};

export const fetchOrderById = (id) => {
  fetchOrderByIdRequest();
  return async (dispatch) => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        url: baseUrl + "/orders/" + id,
        method: "GET",
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchOrderByIdSuccess(data));
    } catch (error) {
      console.log(error);
      errorAlert(error.response.data.message);
    }
  };
};

export const updateOrderStatus = (status, id) => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        url: baseUrl + "/orders/" + id,
        method: "patch",
        data: status,
      });
      dispatch(fetchProfile({ access_token: access_token }));
      return data;
    } catch (error) {
      console.log(error.response.data, "<<<error");
      errorAlert(error.response.data);
    }
  };
};
