import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {allImgReducer} from "./allImgReducer";
import {imgModalWindowReducer} from "./imgModalWindowReducer";

const rootReducer = combineReducers({
    allImg: allImgReducer,
    imgModalWindow: imgModalWindowReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
