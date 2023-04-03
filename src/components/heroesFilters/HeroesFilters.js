// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { setActiveFilters } from "../../actions";

const HeroesFilters = () => {
	const { filters, activeFilter } = useSelector((state) => state);

	const dispatch = useDispatch();

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
