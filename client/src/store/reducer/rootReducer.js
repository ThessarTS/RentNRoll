import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import vehicleReducer from "./vehicleReducer";
import categoryReducer from "./categoryReducer";
const rootReducer = combineReducers({
  vehicleReducer,
  categoryReducer,
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
