// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Component Imports
import { MainNav } from "./Nav";

const Home = () => {
	return (
		<div className="home">
			<MainNav />

			<div className="hero">
				<div className="headline">
					Meet the
					<br />
					Tycoons
				</div>
				<div className="tldr">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quam
					aliquam deserunt libero debitis, odio dicta reprehenderit architecto
					voluptas a, nemo quae impedit eveniet temporibus quaerat non, incidunt
					dolores eos? Vitae commodi quidem natus quam culpa? Non ad nisi nihil
					amet fuga a saepe unde explicabo ipsa qui assumenda temporibus culpa.
				</div>
				<div className="mint">
					<button>Mint a Tycoon</button>
				</div>
				<div className="socials">
					<Link to="#">Twitter</Link>
					<Link to="#">Discord</Link>
				</div>
			</div>

			<div className="scroll">
				<div className="emoji">👇</div>
				<div className="scroll-text">Scroll</div>
			</div>

			<div className="background">
				<img
					src={"./assets/imgs/placeholder-tycoon-1.png"}
					alt="Tycoon"
					className="tycoon tycoon-1"
				/>
				<img
					src={"./assets/imgs/placeholder-tycoon-2.png"}
					alt="Tycoon"
					className="tycoon tycoon-2"
				/>
			</div>
		</div>
	);
};

export default Home;
