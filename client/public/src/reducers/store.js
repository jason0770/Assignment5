import { applyMiddleware, compose, configureStore, createStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import itemReducer from "../features/itemSlice";


export const store = configureStore({
    reducer: {
        cardList: itemReducer
    }
})

