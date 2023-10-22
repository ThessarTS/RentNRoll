import { CATEGORIES_FETCH_SUCCESS } from "../action/actionType/actionType";

const initialState = {
  categories: [],
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: action.payload };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}
export default categoryReducer;
