import {
  ADD_FETCH_SUCCESS,
  TRENDING_FETCH_FAIL,
  TRENDING_FETCH_REQUEST,
  TRENDING_FETCH_SUCCESS,
  VEHICLE_FETCH_BY_ID_FAIL,
  VEHICLE_FETCH_BY_ID_REQUEST,
  VEHICLE_FETCH_BY_ID_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_REQUEST,
  VEHICLE_FETCH_SUCCESS,
} from "../actions/actionType";

const initialState = {
  vehicles: [],
  trending: [],
  vehicle: null,
  loading: false,
  error: "",
};
const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case VEHICLE_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case VEHICLE_FETCH_SUCCESS:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
      };

    case VEHICLE_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case VEHICLE_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        vehicle: action.payload,
      };

    case TRENDING_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TRENDING_FETCH_SUCCESS:
      return {
        ...state,
        trending: action.payload,
        loading: false,
      };

    case TRENDING_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ADD_FETCH_SUCCESS:
      return {
        ...state,
        vehicle: action.payload,
      };

    default:
      return state;
  }
};

export default vehicleReducer;
