import { successAlert } from "../../src/helpers/alert";
import {
  ADD_VEHICLE_REQUEST,
  ADD_VEHICLE_SUCCESS,
  LOCATION_FETCH_SUCCESS,
  MY_RENT_FETCH_FAIL,
  MY_RENT_FETCH_REQUEST,
  MY_RENT_FETCH_SUCCESS,
  MY_VEHICLE_FETCH_REQUEST,
  MY_VEHICLE_FETCH_SUCCESS,
  TRENDING_FETCH_FAIL,
  TRENDING_FETCH_REQUEST,
  TRENDING_FETCH_SUCCESS,
  VEHICLE_FETCH_BY_ID_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_REQUEST,
  VEHICLE_FETCH_SUCCESS,
  VEHICLE_QUERY_FETCH_REQUEST,
  VEHICLE_QUERY_FETCH_SUCCESS,
} from "./actionType";
import axios from "axios";
const baseUrl = "https://apiku.thessarts.site";

export const vehicleFetchRequest = () => {
  return { type: VEHICLE_FETCH_REQUEST };
};

export const vehicleFetchSuccess = (payload) => {
  return { type: VEHICLE_FETCH_SUCCESS, payload };
};

export const vehicleFetchFail = (payload) => {
  return { type: VEHICLE_FETCH_FAIL, payload };
};

export const vehicleFetchQuerySuccess = (payload) => {
  return { type: VEHICLE_QUERY_FETCH_SUCCESS, payload };
};

export const vehicleFetchQueryRequest = () => {
  return { type: VEHICLE_QUERY_FETCH_REQUEST };
};

export const fetchVehicles = (query) => {
  return async (dispatch) => {
    dispatch(vehicleFetchRequest());
    dispatch(vehicleFetchQueryRequest());

    try {
      let params;
      if (query) {
        params = {
          location: query.location,
          startdate: query.startdate,
          enddate: query.enddate,
        };
      }

      if (query) {
        const { data } = await axios.get(`${baseUrl}/vehicles`, { params });
        dispatch(vehicleFetchQuerySuccess(data));
      } else {
        const { data } = await axios.get(`${baseUrl}/vehicles`);
        dispatch(vehicleFetchSuccess(data));
      }
    } catch (error) {
      console.log(error, "disini");
      dispatch(vehicleFetchFail(error));
    }
  };
};
// END FETCH VEHICLES

// FETCH VEHICLE DETAIL
export const detailFetchSuccess = (payload) => {
  return { type: VEHICLE_FETCH_BY_ID_SUCCESS, payload };
};

export const fetchDetail = (id) => {
  return async (dispatch) => {
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
// END FETCH VEHICLE BY ID

// TRENDING
export const trendingFetchRequest = () => {
  return { type: TRENDING_FETCH_REQUEST };
};

export const trendingFetchSuccess = (payload) => {
  return { type: TRENDING_FETCH_SUCCESS, payload };
};

export const trendingFetchFail = (payload) => {
  return { type: TRENDING_FETCH_FAIL, payload };
};

export const fetchTrending = () => {
  return async (dispatch) => {
    dispatch(trendingFetchRequest());
    try {
      const { data } = await axios({
        url: baseUrl + "/trending",
      });
      dispatch(trendingFetchSuccess(data));
    } catch (error) {
      dispatch(trendingFetchFail(error));
    }
  };
};
// END TRENDING

// ADD VEHICLE
export const addVehicleRequest = () => {
  return { type: ADD_VEHICLE_REQUEST };
};

export const addVehicleSuccess = (payload) => {
  return { type: ADD_VEHICLE_SUCCESS, payload };
};

export const addVehicle = (value, access_token) => {
  return async (dispatch) => {
    dispatch(addVehicleRequest());
    try {
      const { data } = await axios({
        url: baseUrl + "/vehicles",
        method: "POST",
        headers: {
          access_token: access_token,
        },
        data: value,
        "Content-Type": "multipart/form-data",
      });
      dispatch(fetchVehicles());
      return data;
    } catch (error) {
      throw error.response.data;
    }
  };
};

// MY RENT
export const myRentfetchRequest = () => {
  return { type: MY_RENT_FETCH_REQUEST };
};

export const myRentfetchSuccess = (payload) => {
  return { type: MY_RENT_FETCH_SUCCESS, payload };
};

export const myRentfetchFail = (payload) => {
  return { type: MY_RENT_FETCH_FAIL, payload };
};

export const fetchMyRent = (access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/orders/owner",
        headers: {
          access_token: access_token,
        },
      });
      dispatch(myRentfetchSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(myRentfetchFail(error));
    }
  };
};
// END MY VEHICLE

// MY VEHICLE
export const fetchMyVehicleRequest = () => {
  return { type: MY_VEHICLE_FETCH_REQUEST };
};

export const fetchMyVehicleSuccess = (payload) => {
  return { type: MY_VEHICLE_FETCH_SUCCESS, payload };
};

export const fetchMyVehicle = (access_token) => {
  return async (dispatch) => {
    dispatch(fetchMyVehicleRequest());
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/vehicles/my-vehicles",
        headers: {
          access_token: access_token,
        },
      });
      // console.log(data);
      dispatch(fetchMyVehicleSuccess(data));
    } catch (error) {
      console.log(error.response.data.message, ">>>>");
    }
  };
};

// END MY VEHICLE

export const deleteMyVehicle = (id, access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "delete",
        url: baseUrl + "/vehicles/" + id,
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchMyVehicle(access_token));
      dispatch(fetchVehicles());
      successAlert("Success Delete Vehicle");
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchLocationSuccess = (payload) => {
  return { type: LOCATION_FETCH_SUCCESS };
};

export const fetchLocation = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "vehicles/locations",
      });
      console.log(data);
      dispatch(fetchLocationSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};
