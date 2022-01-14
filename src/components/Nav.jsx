// Dependencies
import React from "react";
import { NavLink, Link } from "react-router-dom";

// Assets Import
import TwitterIcon from "../assets/svgs/twitter.svg";
import DiscordIcon from "../assets/svgs/discord.svg";
import InstagramIcon from "../assets/svgs/instagram.svg";
import TelegramIcon from "../assets/svgs/telegram.svg";

export const MainNav = () => {
	return (
		<div className="main-nav">
			<div className="socials">
				<Link to="#">
					<TwitterIcon />
				</Link>
				<Link to="#">
					<DiscordIcon />
				</Link>
				<Link to="#">
					<TelegramIcon />
				</Link>
				<Link to="#">
					<InstagramIcon />
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
