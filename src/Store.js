import { createStore } from "redux";
import { reducers } from "./Combine";

const store = createStore(reducers, {})

export default store