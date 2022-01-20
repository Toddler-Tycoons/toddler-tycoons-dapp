// importing dependencies
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// importing components
import { AltNav } from "./Nav";
import { Web3Context } from "../context/web3Context2";

// importing styles
import "../styles/Mint.scss";
import { useEffect } from "react";
import { mintAddress, tUSDCAddress } from "../utils/Address";

const Mint = () => {
	const [toMint, setToMint] = useState(1);
	const [isApp, setIsApp] = useState(false);
	const [allowance, setAllownace] = useState();
	const [tokenIds, settokenIds] = useState();
	// const {
	// 	account,
	// 	getWeb3ModalProvider,
	// 	networkId,
	// 	mint,
	// 	approve,
	// 	isApproved,
	// } = useContext(Web3Context);
	const {
		loadWeb3Modal,
		logoutOfWeb3Modal,
		accountAddress,
		setNetwork,
		USDC,
		Tycoons,
		web3,
	} = useContext(Web3Context);

	const getAllowance = () => {
		USDC.methods
			.allowance(accountAddress, mintAddress)
			.call()
			.then((res) => {
				console.log(res);
				setAllownace(parseInt(res));
				return res;
			});
	};

	useEffect(() => {
		if (accountAddress) getAllowance();
	});

	const approve = () => {
		USDC.methods
			.approve(mintAddress, "50000000000000000000000000")
			.send({ from: accountAddress })
			.then(() => getAllowance());
	};

	const mintNFT = () => {
		Tycoons.methods
			.mintNFT(accountAddress, toMint)
			.send({ from: accountAddress })
			.then((res) => {
				console.log(res);
				const tokenIdsres = resultToTokenIds(res);
				console.log(tokenIdsres);
				settokenIds(tokenIdsres);
			});
	};

	const resultToTokenIds = (res) => {
		const data = res.events.Transfer;
		let result = [];
		for (let i = 0; i < data.length; i++) {
			result.push(data[i].returnValues.tokenId);
		}
		return result;
	};

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
								min={1}
								onChange={(e) => setToMint(e.target.value)}
							/>

							{/* 
								<button onClick={getWeb3ModalProvider}>Connect Wallet</button>
								<button onClick={() => mint(toMint)}>
										Mint {toMint} {toMint <= 1 ? "Tycoon" : "Tycoons"}
									</button>

									<div className="connect-btns">
									{/* <button onClick={getWeb3ModalProvider}>Connect .eth</button> 
									<button onClick={getWeb3ModalProvider} className="wallet-btn">
										Connect Wallet
									</button>
								</div>
							*/}

							{!accountAddress ? (
								<button onClick={loadWeb3Modal}>Connect Wallet</button>
							) : allowance >= 50000000000000000000 ? (
								<button onClick={mintNFT}>
									Mint {toMint} {toMint <= 1 ? "Tycoon" : "Tycoons"}
								</button>
							) : (
								<button onClick={approve}>Approve</button>
							)}
						</div>
						<div className="remaining-info">
							<div className="high">8000 of 8000</div>
							<div className="text">Tycoons left to mint</div>
						</div>
						<div>
							{tokenIds ? `Minted ${tokenIds.length} Tycoons` : ""}
							<br />
							{tokenIds?.map((tokenId, index) => {
								return (
									<a
										key={index}
										target="_blank"
										href={
											"https://testnets.opensea.io/assets/mumbai/0x397567c3e75af2375a885e835bb519f71c22e86a/" +
											tokenId
										}>
										OpenSea
										<br />
									</a>
								);
							})}
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
