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

export const AltNav = ({ web3, account, connect }) => {
	const accountLocal = localStorage.getItem("account");

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
				{accountLocal && web3 ? (
					<>
						{web3.eth.getChainId() === "0x13881" ? (
							<div className="network">Polygon Mumbai Testnet</div>
						) : (
							<div className="network danger">Wrong Network</div>
						)}
						<div className="address">{accountLocal}</div>
					</>
				) : (
					<button onClick={connect}>Connect Wallet</button>
				)}
			</div>
		</div>
	);
};
