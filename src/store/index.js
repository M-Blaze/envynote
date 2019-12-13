import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import state from "./state";
export default createStore(reducer, state, applyMiddleware(thunk));
