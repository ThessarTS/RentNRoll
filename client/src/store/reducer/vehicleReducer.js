import {
  DETAIL_FETCH_SUCCESS,
  TRENDING_FETCH_SUCCESS,
} from "../action/actionType/actionType";

const initialState = {
  trending: [],
  vehicle: [],
  detail: {},
};

function vehicleReducer(state = initialState, action) {
  switch (action.type) {
    case TRENDING_FETCH_SUCCESS:
      return { ...state, trending: action.payload };
    case DETAIL_FETCH_SUCCESS:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
}
export default vehicleReducer;
