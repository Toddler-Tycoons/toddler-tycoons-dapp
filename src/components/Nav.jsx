// Dependencies
import React from "react";
import { NavLink, Link } from "react-router-dom";

// importing styles
import "../styles/Nav.scss";

export const MainNav = () => {
	return (
		<div className="main-nav">
			<div className="socials-wrapper">
				<div className="socials">
					<Link to="#" className="social">
						<img src="./assets/svgs/twitter.svg" alt="twitter" />
					</Link>
					<Link to="#" className="social">
						<img src="./assets/svgs/discord.svg" alt="discord" />
					</Link>
					<Link to="#" className="social">
						<img src="./assets/svgs/instagram.svg" alt="instagram" />
					</Link>
					<Link to="#" className="social">
						<img src="./assets/svgs/telegram.svg" alt="telegram" />
					</Link>
				</div>
			</div>

			<div className="logo">
				<span>
					<NavLink to="/">Toddler Tycoons</NavLink>
				</span>
			</div>

			<div className="menu-wrapper">
				<div className="menu">
					<NavLink to="/" className="menu-item">
						Marketplace
					</NavLink>
					<NavLink to="/" className="menu-item">
						Gallery
					</NavLink>
					<NavLink to="/" className="menu-item">
						Roadmap
					</NavLink>
					<NavLink to="/" className="menu-item">
						Team
					</NavLink>
					<NavLink to="/" className="menu-item">
						FAQ
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export const AltNav = () => {
	return (
		<div className="alt-nav">
			<div className="logo">
				<span>
					<NavLink to="/">Toddler Tycoons</NavLink>
				</span>
			</div>
			<div className="menu">
				<div className="menu">
					<NavLink to="/" className="menu-item">
						Marketplace
					</NavLink>
					<NavLink to="/" className="menu-item">
						Gallery
					</NavLink>
					<NavLink to="/" className="menu-item">
						Roadmap
					</NavLink>
					<NavLink to="/" className="menu-item">
						Team
					</NavLink>
					<NavLink to="/" className="menu-item">
						FAQ
					</NavLink>
				</div>
			</div>
			<div className="account">
				{/* If User */}

				{/* <div className="network">Polygon</div>
				<div className="address">0x69696...69</div> */}

				{/* If not user */}
				<button>Connect Wallet</button>
			</div>
		</div>
	);
};
