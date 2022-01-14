// importing dependencies
import React from "react";
import { Link } from "react-router-dom";

// importing assets
import LyingTycoon from "../assets/imgs/placeholder-lying-tycoon.png";

const NotFound = () => {
	return (
		<div className="not-found">
			<div className="img">
				<img src={LyingTycoon} alt="Tycoon" />
			</div>
			<div className="info">
				<div className="text">Seems like you are lost</div>
				<div className="to-home">
					<Link to="/">Home</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
