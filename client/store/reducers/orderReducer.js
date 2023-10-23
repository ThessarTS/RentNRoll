import { ORDER_FETCH_FAIL, ORDER_FETCH_SUCCESS } from "../actions/actionType";
const initialState = {
  orders: [],
  error: "",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FETCH_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    case ORDER_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
