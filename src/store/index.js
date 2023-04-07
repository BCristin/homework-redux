import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import filters from "../components/heroesFilters/filtersSlice";
import heroes from "../components/heroesList/heroesSlice";

// const store = createStore(
// 	combineReducers({ heroes, filters }),
// 	compose(
// 		applyMiddleware(ReduxThunk),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// );

const store = configureStore({
	reducer: { heroes, filters }, // uneste reducer in unul singur
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // merge si fara asta, fiindca se adauga defal, dar daca vrem sa adaucam un middleware nou trebuie scriem
	devTools: process.env.NODE_ENV !== "production", // pt ca sa mearga extensia din browser , doar modul dezvoltator, daca e in productie nu va merge
});
// store.subscribe(() => console.log(store.getState()));

export default store;
