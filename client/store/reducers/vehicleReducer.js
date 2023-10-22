import { VEHICLE_FETCH_FAIL, VEHICLE_FETCH_REQUEST, VEHICLE_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
  vehicles: [],
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
    default:
      return state;
  }
};

export default vehicleReducer;
