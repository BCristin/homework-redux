import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
	filtersLoadingStatus: "idle",
	activeFilter: "all",
});

// const initialState = {
// 	filters: [],
// 	filtersLoadingStatus: "idle",
// 	activeFilter: "all",
// };

// export const fetchFilter = createAsyncThunk("filters/fetchFilter", async () => {
// 	const { request } = useHttp();
// 	return await request("http://localhost:3001/filters");
// });

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		// filtersFetched: (state, action) => {
		// 	state.filters = action.payload;
		// },
		setActiveFilters: (state, action) => {
			state.activeFilter = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchFilter.pending, (state) => {
	// 			state.filtersLoadingStatus = "loading";
	// 		})
	// 		.addCase(fetchFilter.fulfilled, (state, action) => {
	// 			state.filtersLoadingStatus = "idle";
	// 			// state.filters = action.payload;

	// 			filtersAdapter.setAll(state, action.payload);
	// 		})
	// 		.addCase(fetchFilter.rejected, (state) => {
	// 			state.filtersLoadingStatus = "error";
	// 		})
	// 		.addDefaultCase(() => {});
	// },
});
const { actions, reducer } = filtersSlice;

export default reducer;

// export const { selectAll } = filtersAdapter.getSelectors((state) => state.filters);
export const { setActiveFilters } = actions;
