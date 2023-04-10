import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const apiAddress = "http://localhost:3001/heroes";

const heroesAdapter = createEntityAdapter();
// const initialState = {
// 	heroes: [],
// 	heroesLoadingStatus: "idle",
// };
const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: "idle",
});

//#region  date server
export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
	const { request } = useHttp();
	return request(apiAddress);
});
export const postHero = createAsyncThunk("heroes/postHero", async (hero) => {
	const { request } = useHttp();
	return await request(apiAddress, "POST", JSON.stringify(hero));
});
export const removeHero = createAsyncThunk("heroes/removeHero", async (id) => {
	const { request } = useHttp();
	return await request(`${apiAddress}/${id}`, "DELETE");
}); //#endregion

// combina actiunele cu reducers
const heroesSlice = createSlice({
	name: "heroes",
	initialState,
	reducers: {
		// heroesFetching: (state) => {
		// 	state.heroesLoadingStatus = "loading";
		// },
		// heroesFetched: (state, action) => {
		// 	state.heroesLoadingStatus = "idle";
		// 	state.heroes = action.payload;
		// },
		// heroesFetchingError: (state) => {
		// 	state.heroesLoadingStatus = "error";
		// },
		// heroAdd: (state, action) => {
		// 	state.heroes.push(action.payload);
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = "loading";
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = "idle";
				heroesAdapter.setAll(state, action.payload);
				// state.heroes = action.payload;
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = "error";
			})
			.addCase(postHero.fulfilled, (state, action) => {
				// state.heroes.push(action.payload);
				heroesAdapter.addOne(state, action.payload);
			})
			// .addCase(removeHero.pending, (state) => {
			// 	state.heroesLoadingStatus = "loading";
			// })
			.addCase(removeHero.fulfilled, (state, action) => {
				// state.heroesLoadingStatus = "idle";
				// state.heroes = state.heroes.filter((hero) => hero.id !== action.meta.arg);
				heroesAdapter.removeOne(state, action.payload);
			})
			.addCase(removeHero.rejected, (state) => {
				state.heroesLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const { actions, reducer } = heroesSlice;

export default reducer;
const { selectAll } = heroesAdapter.getSelectors((state) => {
	// console.log(state);
	return state.heroes;
});

const filteringHeroes = (arr, activeFilter) => {
	if (activeFilter === "all") return arr;
	return arr.filter((hero) => hero.element === activeFilter);
};
export const filteredHeroesSelector = createSelector(
	// memoreaza valoarea, verfica daca noua valoare e la fel ca ceava veche si daca e ca cea veche nu randeaza
	(state) => state.filters.activeFilter,
	// (state) => state.heroes.heroes,
	selectAll,
	(activeFilter, heroes) => filteringHeroes(heroes, activeFilter)
);

export const { heroesFetching, heroesFetched, heroesFetchingError, heroAdd } = actions;
