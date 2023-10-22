import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import vehicleReducer from "./vehicleReducer";
import categoryReducer from "./categoryReducer";
const rootReducer = combineReducers({
  vehicleReducer,
  categoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
