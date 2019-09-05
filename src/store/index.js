import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { saveState, loadState } from "./localStorage";

const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    saveState({
        comments: store.getState().comments 
    });
});

export default store;