// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Component Imports
import { MainNav } from "./Nav";
import { handleNumbers } from "../utils/handleNumbers";

// importing styles
import "../styles/Home.scss";

const Home = () => {
	return (
		<div className="home">
			<MainNav />

			<div className="hero">
				<div className="content-wrapper">
					<div className="headline">
						Meet the
						<br />
						Tycoons
					</div>
					<div className="tldr">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quam
						aliquam deserunt libero debitis, odio dicta reprehenderit architecto
						voluptas a, nemo quae impedit eveniet temporibus quaerat non,
						incidunt dolores eos? Vitae commodi quidem natus quam culpa? Non ad
						nisi nihil amet fuga a saepe unde explicabo ipsa qui assumenda
						temporibus culpa.
					</div>
					<div className="to-mint-btn">
						<button>
							<Link to="/mint">Mint a Tycoon</Link>
						</button>
					</div>
					<div className="socials">
						<Link to="#" className="twitter">
							Twitter
						</Link>
						<Link to="#" className="discord">
							Discord
						</Link>
					</div>
				</div>

				<div className="scroll">
					<div className="emoji">👇</div>
					<div className="scroll-text">Scroll</div>
				</div>

				<div className="background">
					<img
						src={"./assets/imgs/tycoon2.png"}
						alt="Tycoon"
						className="tycoon tycoon-1"
					/>
					<img
						src={"./assets/imgs/tycoon1.png"}
						alt="Tycoon"
						className="tycoon tycoon-2"
					/>
				</div>
			</div>

			<div className="treasurey">
				<div className="bank-image">
					<img src="./assets/imgs/bank.png" alt="bank" />
				</div>
				<div className="stats">
					<div className="sold">
						<div className="value">1234</div>
						<div className="text">Tycoons already Sold</div>
					</div>
					<div className="total">
						<div className="value">{handleNumbers(1200000)}</div>
						<div className="text">USDC in Treasurey</div>
					</div>
					<div className="backed">
						<div className="value">
							50<span>USDC</span>
						</div>
						<div className="text">backed to every Tycoon</div>
					</div>
				</div>
			</div>

			<div className="roadmap"></div>

			<div className="team"></div>
		</div>
	);
};

export default Home;
