import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { selectAll, setActiveFilters } from "../heroesFilters/filtersSlice";

const HeroesFilters = () => {
	const dispatch = useDispatch();
	const { activeFilter } = useSelector((state) => {
		return state.filters;
	});
	const filters = selectAll(store.getState());
	// console.log(filters);

	const handlerFiltre = (activeBTN) => {
		dispatch(setActiveFilters(activeBTN));
	};
	const renderOptionSelect = () => {
		return filters.map((item) => {
			const clazz = `btn ${item.className} ${activeFilter === item.name ? "active" : ""}`;
			return (
				<button
					key={item.name + item.label}
					className={clazz}
					onClick={() => handlerFiltre(item.name)}
				>
					{item.label}
				</button>
			);
		});
	};
	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{/* <button className="btn btn-outline-dark active">Все</button>
					<button className="btn btn-danger">Огонь</button>
					<button className="btn btn-primary">Вода</button>
					<button className="btn btn-success">Ветер</button>
					<button className="btn btn-secondary">Земля</button> */}
					{renderOptionSelect(activeFilter)}
				</div>
			</div>
		</div>
	);
};

export default HeroesFilters;
