export const heroesFetching = () => {
	return {
		type: "HEROES_FETCHING",
	};
};

export const heroesFetched = (heroes) => {
	return {
		type: "HEROES_FETCHED",
		payload: heroes,
	};
};

export const heroesFetchingError = () => {
	return {
		type: "HEROES_FETCHING_ERROR",
	};
};
export const heroAdd = (hero) => {
	return {
		type: "HERO_ADD",
		payload: hero,
	};
};

export const filtersFetched = (filters) => {
	return {
		type: "FILTERS_FETCHED",
		payload: filters,
	};
};
export const setActiveFilters = (filter) => {
	return {
		type: "SET_ACTIVE_FILTERS",
		payload: filter,
	};
};
