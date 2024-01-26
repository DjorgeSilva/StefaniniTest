import { combineReducers, createStore } from "redux";
import userStoreReducer from "./user/reducers/userStoreReducer";

const rootReducer = combineReducers({ userStore: userStoreReducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
