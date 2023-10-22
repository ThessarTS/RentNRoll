import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import vehicleReducer from "./vehicleReducer";
const rootReducer = combineReducers({
  vehicleReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
