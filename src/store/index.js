import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import filters from "../components/heroesFilters/filtersSlice";

// const store = createStore(
// 	combineReducers({ heroes, filters }),
// 	compose(
// 		applyMiddleware(ReduxThunk),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// );

const store = configureStore({
	reducer: {
		// heroes,
		filters,
		[apiSlice.reducerPath]: apiSlice.reducer,
	}, // uneste reducer in unul singur
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware), // merge si fara asta(middleware: (getDefaultMiddleware) => getDefaultMiddleware()), fiindca se adauga defaul, dar daca vrem sa adaugam un middleware nou trebuie scriem
	devTools: process.env.NODE_ENV !== "production", // pt ca sa mearga extensia din browser , doar modul dezvoltator, daca e in productie nu va merge
});
// store.subscribe(() => console.log(store.getState()));

export default store;
