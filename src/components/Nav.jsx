// Dependencies
import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { Web3Context } from "../context/web3Context";

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
					<NavLink to="/auctions" className="menu-item">
						Auctions
					</NavLink>
					<NavLink to="/gallery" className="menu-item">
						Gallery
					</NavLink>
					<NavLink to="/" className="menu-item">
						Roadmap
					</NavLink>
					<NavLink to="/" className="menu-item">
						Team
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export const AltNav = () => {
	const { account, getWeb3ModalProvider, networkId, disconnectProvider } =
		useContext(Web3Context);

	return (
		<div className="alt-nav">
			<div className="logo">
				<span>
					<NavLink to="/">Toddler Tycoons</NavLink>
				</span>
			</div>
			<div className="menu">
				<div className="menu">
					<NavLink to="/auctions" className="menu-item">
						Auctions
					</NavLink>
					<NavLink to="/gallery" className="menu-item">
						Gallery
					</NavLink>
					<NavLink to="/" className="menu-item">
						Roadmap
					</NavLink>
					<NavLink to="/" className="menu-item">
						Team
					</NavLink>
				</div>
			</div>
			<div className="account">
				{account ? (
					<>
						{networkId === "80001" ? (
							<div className="network">Polygon Testnet</div>
						) : (
							<div className="network danger">Wrong Network</div>
						)}
						<div className="address">{account}</div>

						<button className="logout-btn" onClick={disconnectProvider}>
							Logout
						</button>
					</>
				) : (
					<div className="connect-btns">
						{/* <button onClick={getWeb3ModalProvider}>Connect .eth</button> */}
						<button onClick={getWeb3ModalProvider} className="wallet-btn">
							Connect Wallet
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
