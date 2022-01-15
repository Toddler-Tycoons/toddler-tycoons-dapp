// Dependencies
import React from "react";
import { NavLink, Link } from "react-router-dom";

export const MainNav = () => {
	return (
		<div className="main-nav">
			<div className="socials">
				<Link to="#">
					<img src="./assets/svgs/twitter.svg" alt="twitter" />
				</Link>
				<Link to="#">
					<img src="./assets/svgs/discord.svg" alt="discord" />
				</Link>
				<Link to="#">
					<img src="./assets/svgs/instagram.svg" alt="instagram" />
				</Link>
				<Link to="#">
					<img src="./assets/svgs/telegram.svg" alt="telegram" />
				</Link>
			</div>

			<div className="logo">
				<span>Toddler Tycoons</span>
			</div>

			<div className="menu">
				<NavLink to="/">Marketplace</NavLink>
				<NavLink to="/">Gallery</NavLink>
				<NavLink to="/">Roadmap</NavLink>
				<NavLink to="/">Team</NavLink>
				<NavLink to="/">FAQ</NavLink>
			</div>
		</div>
	);
};

export const AltNav = () => {
	return (
		<div className="alt-nav">
			<div className="logo">
				<span>Toddler Tycoons</span>
			</div>
			<div className="menu">
				<NavLink to="/">Marketplace</NavLink>
				<NavLink to="/">Gallery</NavLink>
				<NavLink to="/">Roadmap</NavLink>
				<NavLink to="/">Team</NavLink>
				<NavLink to="/">FAQ</NavLink>
			</div>
			<div className="account">
				{/* If User */}

				{/* <div className="network"></div>
				<div className="address"></div> */}

				{/* If not user */}
				<button>Connect Wallet</button>
			</div>
		</div>
	);
};
