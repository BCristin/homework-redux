const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
	filters: [],
	filtersLoadingStatus: "idle",
	activeFilter: "all",
	filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "HEROES_FETCHING":
			return {
				...state,
				heroesLoadingStatus: "loading",
			};
		case "HEROES_FETCHED":
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: "idle",
			};
		case "HEROES_FETCHING_ERROR":
			return {
				...state,
				heroesLoadingStatus: "error",
			};
		case "HERO_ADD":
			return {
				...state,
				heroes: [...state.heroes, action.payload],
			};
		case "FILTERS_FETCHED":
			return {
				...state,
				filters: action.payload,
			};
		case "SET_ACTIVE_FILTERS":
			return {
				...state,
				activeFilter: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
