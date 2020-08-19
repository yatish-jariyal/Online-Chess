import { combineReducers } from "redux";

//ALL REDUCERS
import chessReducer from "./chessReducer";

const rootReducer = combineReducers({
  chessState: chessReducer,
});

export default rootReducer;
