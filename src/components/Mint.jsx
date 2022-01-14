// importing dependencies
import React from "react";
import { Link } from "react-router-dom";

// importing components
import { AltNav } from "./Nav";

const Mint = () => {
	return (
		<div className="mint">
			<AltNav />
			<div className="tycoon-imgs"></div>
			<div className="content">
				<div className="title">Mint Tycoons</div>
				<div className="mint-card">
					<div className="input">
						<input type="number" />
						<button>Mint 1 Tycoon</button>
					</div>
					<div className="remaining-info">
						<div className="high">8000 of 8000</div>
						<div className="text">Tycoons left to mint</div>
					</div>
				</div>
			</div>
			<div className="socials-alt">
				<Link to="#">Twitter</Link>
				<Link to="#">Discord</Link>
				<Link to="#">Telegram</Link>
				<Link to="#">Instagram</Link>
			</div>
		</div>
	);
};

export default Mint;
