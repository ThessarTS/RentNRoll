import { CATEGORIES_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
  categories: [],
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
