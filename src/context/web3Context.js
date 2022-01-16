import { useState, createContext, useEffect } from "react";
import Web3 from "web3";
import Web3Modal, { Provider } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mintAbi, tUSDCAbi } from "../utils/Abi";
import { mintAddress, tUSDCAddress } from "../utils/Address";

const Web3Context = createContext({
	web3: undefined,
	account: undefined,
	getWeb3ModalProvider: () => {},
	disconnectProvider: () => {},
	providerName: "none",
});

const providerOptions = {
	walletConnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: "28f04f9dad31453b8ffe34558f6a3a15",
		},
	},
};

const web3Modal = new Web3Modal({
	network: {
		chainId: 80001,
		nodeUrl:
			"https://speedy-nodes-nyc.moralis.io/8446a7e044dc4043c63d04d8/polygon/mumbai",
	},
	cacheProvider: true,
	providerOptions,
});

const Web3ContextProvider = (props) => {
	const [provider, setProvider] = useState();
	const [providerName, setProviderName] = useState("None");
	const [tUSDCContract, setTUSDCContract] = useState();
	const [mintContract, setMintContract] = useState();

	const [web3, setWeb3] = useState(new Web3());
	const [account, setAccount] = useState();
	const [networkId, setNetworkId] = useState("");

	const getWeb3ModalProvider = async () => {
		if (!provider) {
			const _provider = await web3Modal.connect();
			setWeb3(new Web3(_provider));
			setProvider(_provider);
			setNetworkId(_provider.networkVersion);
		}
	};

	const connectENS = async (domain) => {
		const address = web3.eth.ens.getAddress(domain);
		setAccount(address);
	};

	const disconnectProvider = () => {
		console.log("Disconnect");
		setAccount(undefined);
		setProvider(undefined);
		setProviderName("None");
		setWeb3(new Web3());
		web3Modal.clearCachedProvider();
	};

	useEffect(() => {
		setMintContract(new web3.eth.Contract(mintAbi, mintAddress));
		setTUSDCContract(new web3.eth.Contract(tUSDCAbi, tUSDCAddress));

		if (web3Modal.cachedProvider) {
			(async () => {
				await web3Modal.connect();
			})();
		}

		if (web3.currentProvider)
			(async () => {
				const accounts = await web3.eth.getAccounts();
				setAccount(accounts[0].toLowerCase());
			})();

		if (!!provider) {
			if (provider?._walletConnect) {
				setProviderName("walletConnect");
				provider._walletConnect.showWallectConnect();
			} else setProviderName("metamask");

			provider.on("accountsChanged", async (accounts) => {
				console.log("Provider Listener: Account Change");
				setAccount(accounts[0].toLowerCase());
			});

			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log("Provider Listener: Chain Change", chainId);
				setNetworkId(chainId);
			});

			// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log("Provider Listener: Connected");
				console.log(info);
				setNetworkId(info.chainId);
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log("Provider Listener: Disconnect", error);
				setAccount();
			});
		}
	}, [provider, web3]);

	const mint = async (_qty) => {
		return await mintContract.methods
			.mintNFT(account, _qty)
			.send({ from: account });
	};

	const approve = async () => {
		return await tUSDCContract.methods
			.approve(mintAddress, "1000000000000000000000000")
			.send({ from: account });
	};

	const getTreasuryBalance = async () => {
		return await tUSDCContract.methods.balanceOf(mintAddress).call();
	};

	const isApproved = async () => {
		return await tUSDCContract.methods.allowance(account, mintAddress).call();
	};

	const rewardBalance = async () => {
		return await mintContract.methods.rewardBalance(account).call();
	};

	const NFTBalance = async () => {
		return await mintContract.methods.balanceOf(account).call();
	};

	const tUSDCBalance = async () => {
		return await tUSDCContract.methods.balanceOf(account).call();
	};

	return (
		<Web3Context.Provider
			value={{
				account,
				provider,
				providerName,
				getWeb3ModalProvider,
				disconnectProvider,
				networkId,
				connectENS,
				mint,
				approve,
				rewardBalance,
				NFTBalance,
				tUSDCBalance,
				isApproved,
				getTreasuryBalance,
			}}>
			{props.children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
