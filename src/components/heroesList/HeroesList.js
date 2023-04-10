import { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./heroesList.scss";

// ce tine de Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes, filteredHeroesSelector } from "../heroesList/heroesSlice";

const HeroesList = () => {
	const dispatch = useDispatch();
	// const { activeFilter } = useSelector((state) => state.filters);
	const { heroesLoadingStatus } = useSelector((state) => state.heroes); // extrage din state valoriile specificate

	// scoate lista filtrata
	const filteredHeroes = useSelector(filteredHeroesSelector);

	useEffect(() => {
		dispatch(fetchHeroes()); // dispatch cumva salveaza valrile in local store, in cazul dat le ia de pe server si le salveaza
		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
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
