// importing dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

// importing components
import { AltNav } from "./Nav";

// importing styles
import "../styles/Mint.scss";

const Mint = () => {
	const [toMint, setToMint] = useState(0);
	const [account, setAccount] = useState("");
	const [web3, setWeb3] = useState(null);

	const providerOptions = {
		walletconnect: {
			package: WalletConnectProvider, // required
			options: {
				infuraId: "8446a7e044dc4043c63d04d8", // required
			},
		},
	};

	const web3Modal = new Web3Modal({
		network: {
			chainId: 8001,
			nodeUrl:
				"https://speedy-nodes-nyc.moralis.io/8446a7e044dc4043c63d04d8/polygon/mumbai",
		},
		cacheProvider: true,
		providerOptions,
	});

	const connect = async () => {
		const provider = await web3Modal.connect();
		const web3_local = new Web3(provider);
		const accounts = await web3_local.eth.getAccounts();
		window.localStorage.setItem("account", accounts[0]);
		setAccount(accounts[0]);
		setWeb3(web3_local);
	};

	return (
		<div className="mint">
			<AltNav web3={web3} account={account} connect={connect} />
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
								<button onClick={connect}>Connect Wallet</button>
							) : (
								<button>
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
