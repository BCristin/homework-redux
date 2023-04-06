import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
};
export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
	const { request } = useHttp();
	return await request("http://localhost:3001/heroes");
});

export const postHero = createAsyncThunk("heroes/postHero", async (hero) => {
	const { request } = useHttp();
	return await request("http://localhost:3001/heroes", "POST", JSON.stringify(hero));
});

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
				state.heroes = action.payload;
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = "error";
			})
			.addCase(postHero.fulfilled, (state, action) => {
				state.heroes.push(action.payload);
			})
			.addDefaultCase(() => {});
	},
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroesFetching, heroesFetched, heroesFetchingError, heroAdd } = actions;
