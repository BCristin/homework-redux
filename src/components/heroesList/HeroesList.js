import { CSSTransition, TransitionGroup } from "react-transition-group";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./heroesList.scss";

// ce tine de Redux
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetHeroesQuery } from "../../api/apiSlice";

const HeroesList = () => {
	const {
		data: heroes = [],
		// isFetching, // se schimba de fiecare data
		isLoading, // va fi true cand se incarca datele de pe server prima data
		// isSuccess, // cand tot ok
		isError, // cand eroare
		// error, // eroare in sine
	} = useGetHeroesQuery();
	const activeFilter = useSelector((state) => state.filters.activeFilter);
	const filteredHeroes = useMemo(() => {
		const filteredHeroes = heroes.slice();
		if (activeFilter === "all") return filteredHeroes;
		return filteredHeroes.filter((hero) => hero.element === activeFilter);
	}, [heroes, activeFilter]);
	// const filteredHeroesSelector = createSelector(
	// 	// memoreaza valoarea, verfica daca noua valoare e la fel ca ceava veche si daca e ca cea veche nu randeaza
	// 	(state) => state.filters.activeFilter,
	// 	// (state) => state.heroes.heroes,
	// 	selectAll,
	// 	(activeFilter, heroes) => filteringHeroes(heroes, activeFilter)
	// );

	// const dispatch = useDispatch();
	// const { activeFilter } = useSelector((state) => state.filters);
	// const { heroesLoadingStatus } = useSelector((state) => state.heroes); // extrage din state valoriile specificate

	// scoate lista filtrata
	// const filteredHeroes = useSelector(filteredHeroesSelector);

	// useEffect(() => {
	// 	dispatch(fetchHeroes()); // dispatch cumva salveaza valoriile in store, in cazul dat le ia de pe server si le salveaza
	// 	// eslint-disable-next-line
	// }, []);

	if (isLoading) {
		return <Spinner />;
	} else if (isError) {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition timeout={0} classNames="hero">
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			);
		}

		return arr.map(({ id, ...props }) => {
			return (
				<CSSTransition key={id} timeout={500} classNames="hero">
					<HeroesListItem key={id} {...props} id={id} />
				</CSSTransition>
			);
		});
	};

	const elements = renderHeroesList(filteredHeroes);
	return <TransitionGroup component="ul">{elements}</TransitionGroup>;
	// return <ul>{elements}</ul>;
};

export default HeroesList;
