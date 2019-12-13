import { createStore } from "redux";
import reducer from "./reducer";
import state from "./state";
export default createStore(reducer, state);
