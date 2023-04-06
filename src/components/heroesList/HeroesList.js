import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { fetchHeroes } from "../heroesList/heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "./heroesList.scss";

const HeroesList = () => {
	// const { activeFilter } = useSelector((state) => state.filters);
	const { heroes, heroesLoadingStatus } = useSelector((state) => state.heroes);

	const filteredHeroesSelector = createSelector(
		(state) => state.filters.activeFilter,
		(state) => state.heroes.heroes,
		(activeFilter, heroes) => filterHeroesFN(heroes, activeFilter)
	);
	const filteredHeroes = useSelector(filteredHeroesSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchHeroes());
		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	function filterHeroesFN(arr, activeFilter) {
		console.log("render");
		if (activeFilter === "all") return arr;
		return arr.filter((hero) => hero.element === activeFilter);
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition timeout={0} classNames="hero">
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			);
		}

		return filteredHeroes.map(({ id, ...props }) => {
			return (
				<CSSTransition key={id} timeout={500} classNames="hero">
					<HeroesListItem key={id} {...props} id={id} />
				</CSSTransition>
			);
		});
	};

	const elements = renderHeroesList(heroes);
	return <TransitionGroup component="ul">{elements}</TransitionGroup>;
	// return <ul>{elements}</ul>;
};

export default HeroesList;
