import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { useCreateHeroMutation } from "../../api/apiSlice";
import { fetchFilter, selectAll } from "../heroesFilters/filtersSlice";

const HeroesAddForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [element, setElement] = useState("");
	// eslint-disable-next-line
	const [createHero, { isLoading }] = useCreateHeroMutation();

	const state = useSelector((state) => state);
	const { filtersLoadingStatus } = state.filters;

	const dispatch = useDispatch();
	// const { filters } = useSelector((state) => state.filters);

	const filters = selectAll(state);

	useEffect(() => {
		dispatch(fetchFilter());
		// eslint-disable-next-line
	}, []);

	const resetForm = () => {
		setName("");
		setDescription("");
		setElement("");
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const hero = { id: uuidv4(), name, description, element };
		// dispatch(postHero(hero)).then(resetForm());
		createHero(hero).unwrap();
		resetForm();
	};
	const renderOptionSelect = (filters, status) => {
		if (status === "loading") {
			return <option>Загрузка элементов</option>;
		} else if (status === "error") {
			return <option>Ошибка загрузки</option>;
		}
		if (filters && filters.length > 0) {
			return filters.map((item) => {
				if (item.name === "all") return null;
				return (
					<option key={item.id} value={item.name}>
						{item.label}
					</option>
				);
			});
		}
	};

	return (
		<form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">
					Имя нового героя
				</label>
				<input
					required
					type="text"
					name="name"
					className="form-control"
					id="name"
					placeholder="Как меня зовут?"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">
					Описание
				</label>
				<textarea
					required
					name="text"
					className="form-control"
					id="text"
					placeholder="Что я умею?"
					style={{ height: "130px" }}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">
					Выбрать элемент героя
				</label>
				<select
					required
					className="form-select"
					id="element"
					name="element"
					value={element}
					onChange={(e) => {
						setElement(e.target.value);
					}}
				>
					<option>Я владею элементом...</option>
					{renderOptionSelect(filters, filtersLoadingStatus)}
					{/* <option value="fire">Огонь</option>
					<option value="water">Вода</option>
					<option value="wind">Ветер</option>
					<option value="earth">Земля</option> */}
				</select>
			</div>

			<button type="submit" className="btn btn-primary">
				Создать
			</button>
		</form>
	);
};

export default HeroesAddForm;
