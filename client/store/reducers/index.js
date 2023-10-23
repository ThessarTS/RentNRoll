import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import vehicleReducer from "./vehicleReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  vehicleReducer,
  categoryReducer,
  userReducer,
  orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
