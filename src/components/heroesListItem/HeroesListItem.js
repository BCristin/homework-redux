import { useCallback } from "react";
import { useDeleteHeroMutation } from "../../api/apiSlice";

const HeroesListItem = ({ name, description, element, id }) => {
	// const { heroes } = useSelector((state) => state.heroes);
	// const dispatch = useDispatch();
	// const { request } = useHttp();

	let elementClassName;

	switch (element) {
		case "fire":
			elementClassName = "bg-danger bg-gradient";
			break;
		case "water":
			elementClassName = "bg-primary bg-gradient";
			break;
		case "wind":
			elementClassName = "bg-success bg-gradient";
			break;
		case "earth":
			elementClassName = "bg-secondary bg-gradient";
			break;
		default:
			elementClassName = "bg-warning bg-gradient";
	}
	// const removeHeroFN = (id) => {
	// 	dispatch(removeHero(id));
	// 	// const data = heroes.filter((hero) => hero.id !== id);
	// 	// dispatch(heroesFetched(data));
	// 	// request(`http://localhost:3001/heroes/${id}`, "DELETE")
	// 	// 	.then(dispatch(heroesFetched(data)))
	// 	// 	.catch(() => alert("ceva nu a mers bine"));
	// };
	const [deleteHero] = useDeleteHeroMutation();
	const onDelete = useCallback((id) => {
		deleteHero(id);
		// eslint-disable-next-line
	}, []);

	return (
		<li className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaD1rl_jlxF4J4OXBfVf1_NKh3Dv-PrHpEgA&usqp"
				className="img-fluid w-25 d-inline"
				alt="unknown hero"
				style={{ objectFit: "cover" }}
			/>
			<div className="card-body">
				<h3 className="card-title">{name}</h3>
				<p className="card-text">{description}</p>
			</div>
			<span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
				<button
					type="button"
					className="btn-close btn-close"
					aria-label="Close"
					onClick={() => onDelete(id)}
				></button>
			</span>
		</li>
	);
};

export default HeroesListItem;
