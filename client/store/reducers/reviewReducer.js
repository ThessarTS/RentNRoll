import { FETCH_REVIEW_BY_USER_SUCCESS, FETCH_REVIEW_BY_VEHICLE_SUCCESS } from "../actions/actionType";

const initialState = {
  userReviews: [],
  vehicleReviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEW_BY_USER_SUCCESS:
      return {
        ...state,
        userReviews: action.payload,
      };

    case FETCH_REVIEW_BY_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicleReviews: action.payload,
      };

    default:
      return state;
  }
};

export default reviewReducer;
