// export const fetchHeroes = (request) => (dispatch) => {
// 	dispatch(heroesFetching());
// 	request("http://localhost:3001/heroes")
// 		.then((data) => dispatch(heroesFetched(data)))
// 		.catch(() => dispatch(heroesFetchingError()));
// };

// export const fetchFilter = (request) => (dispatch) => {
// 	request("http://localhost:3001/filters")
// 		.then((data) => dispatch(filtersFetched(data)))
// 		.catch(() => alert("ceva nu a mers bine cu preluarea filtrelor JSON"));
// };
// export const postHero = (request, hero, resetForm) => (dispatch) => {
// 	request(`http://localhost:3001/heroes`, "POST", JSON.stringify(hero))
// 		.then(dispatch(heroAdd(hero)))
// 		.then(resetForm)
// 		.catch(() => alert("ceva nu a mers bine cu adaugarea eroul in JSON"));
// };

// export const heroesFetching = () => {
// 	return {
// 		type: "HEROES_FETCHING",
// 	};
// };

// export const heroesFetched = (heroes) => {
// 	return {
// 		type: "HEROES_FETCHED",
// 		payload: heroes,
// 	};
// };

// export const heroesFetchingError = () => {
// 	return {
// 		type: "HEROES_FETCHING_ERROR",
// 	};
// };
// export const heroAdd = (hero) => {
// 	return {
// 		type: "HERO_ADD",
// 		payload: hero,
// 	};
// };

// export const filtersFetched = (filters) => {
// 	return {
// 		type: "FILTERS_FETCHED",
// 		payload: filters,
// 	};
// };
// export const setActiveFilters = (filter) => {
// 	return {
// 		type: "SET_ACTIVE_FILTERS",
// 		payload: filter,
// 	};
// };
