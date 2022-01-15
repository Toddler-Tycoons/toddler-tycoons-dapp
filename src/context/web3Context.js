import { useState, createContext, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

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
		chainId: 8001,
		nodeUrl:
			"https://speedy-nodes-nyc.moralis.io/8446a7e044dc4043c63d04d8/polygon/mumbai",
	},
	cacheProvider: true,
	providerOptions,
});

const Web3ContextProvider = (props) => {
	const [provider, setProvider] = useState();
	const [providerName, setProviderName] = useState("None");
	const [web3, setWeb3] = useState(new Web3());
	const [account, setAccount] = useState();
	const [networkId, setNetworkId] = useState(80001);

	const getWeb3ModalProvider = async () => {
		if (provider) {
			if (provider?._walletConnect) provider._walletConnect.showWalletConnect();
		} else {
			const _provider = await web3Modal.connect();
			setWeb3(new Web3(_provider));
			setProvider(_provider);
		}
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
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log("Provider Listener: Disconnect", error);
				setAccount();
			});
		}
	}, [provider, web3]);

	return (
		<Web3Context.Provider
			value={{
				account,
				provider,
				providerName,
				getWeb3ModalProvider,
				disconnectProvider,
				networkId,
			}}>
			{props.children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
