import { PROFILES_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
  profile: {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILES_FETCH_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
