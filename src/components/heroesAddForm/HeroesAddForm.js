// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { filtersFetched, heroAdd } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [element, setElement] = useState("");

	const dispatch = useDispatch();
	const { filters } = useSelector((state) => state);

	const { request } = useHttp();

	useEffect(() => {
		request("http://localhost:3001/filters")
			.then((data) => dispatch(filtersFetched(data)))
			.catch(() => alert("ceva nu a mers bine cu preluarea filtrelor JSON"));
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
		request(`http://localhost:3001/heroes`, "POST", JSON.stringify(hero))
			.then(dispatch(heroAdd(hero)))
			.catch(() => alert("ceva nu a mers bine cu adaugarea eroul in JSON"));
		resetForm();
	};
	const renderOptionSelect = () => {
		return filters.map((item) => {
			if (item.name === "all") return null;
			return (
				<option key={item.name + item.label} value={item.name}>
					{item.label}
				</option>
			);
		});
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
					{renderOptionSelect()}
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
