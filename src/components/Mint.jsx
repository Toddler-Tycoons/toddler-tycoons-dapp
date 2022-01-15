// importing dependencies
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// importing components
import { AltNav } from "./Nav";
import { Web3Context } from "../context/web3Context";

// importing styles
import "../styles/Mint.scss";

const Mint = () => {
	const [toMint, setToMint] = useState(0);
	const { account, getWeb3ModalProvider } = useContext(Web3Context);

	return (
		<div className="mint">
			<AltNav />
			<div className="content-wrapper">
				<div className="tycoon-imgs">
					<img
						src={"./assets/imgs/tycoon3.png"}
						alt="Tycoon"
						className="tycoon3"
					/>
					<img
						src={"./assets/imgs/tycoon4.png"}
						alt="Tycoon"
						className="tycoon4"
					/>
				</div>
				<div className="content">
					<div className="title">Mint Tycoons</div>
					<div className="mint-card">
						<div className="input">
							<input
								type="number"
								name="toMint"
								value={toMint}
								onChange={(e) => setToMint(e.target.value)}
							/>
							{!account ? (
								<button onClick={getWeb3ModalProvider}>Connect Wallet</button>
							) : (
								<button onClick={() => {}}>
									Mint {toMint} {toMint <= 1 ? "Tycoon" : "Tycoons"}
								</button>
							)}
						</div>
						<div className="remaining-info">
							<div className="high">8000 of 8000</div>
							<div className="text">Tycoons left to mint</div>
						</div>
					</div>
				</div>
				<div className="socials-alt">
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
		</div>
	);
};

export default Mint;
