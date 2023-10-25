import { ORDER_FETCH_BY_VEHICLE_ID_REQUEST, ORDER_FETCH_BY_VEHICLE_ID_SUCCESS, ORDER_FETCH_FAIL, ORDER_FETCH_REQUEST, ORDER_FETCH_SUCCESS } from "../actions/actionType";
const initialState = {
  orders: [],
  orderByVehicles: [],
  loading: false,
  error: "",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_FETCH_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case ORDER_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ORDER_FETCH_BY_VEHICLE_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_FETCH_BY_VEHICLE_ID_SUCCESS:
      return {
        ...state,
        orderByVehicles: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
