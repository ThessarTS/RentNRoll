import { ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, PROFILES_FETCH_REQUEST, PROFILES_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
  loading: false,
  profile: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILES_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PROFILES_FETCH_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case ADD_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case "logout/success":
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
