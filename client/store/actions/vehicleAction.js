import {
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

let baseUrl = "https://0187-2001-448a-1021-5f44-11c3-740a-ea80-49d6.ngrok-free.app";

// FETCH VEHICLES
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
      console.log(error);
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
