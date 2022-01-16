import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { mintAbi, tUSDCAbi } from "../utils/Abi";
import { mintAddress, tUSDCAddress } from "../utils/Address";
import WalletConnectProvider from "@walletconnect/web3-provider";

const Web3Context = createContext({
    balance: null,
    error: null,
    loadWeb3Modal: () => {},
    logoutOfWeb3Modal: () => {},
    accountAddress: "",
    contract: null,
});

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                80001: "https://speedy-nodes-nyc.moralis.io/8446a7e044dc4043c63d04d8/polygon/mumbai",
            },
        },
    },
};

const Web3ContextProvider = props => {
    const [network, setNetwork] = useState("0x13881");
    const [provider, setProvider] = useState();
    const [signedInAddress, setSignedInAddress] = useState("");

    const web3Modal = useMemo(() => {
        return new Web3Modal({
            providerOptions: providerOptions,
        });
    }, [network]);

    const { web3, USDC, Tycoons } = useMemo(() => {
        const web3 = new Web3(provider || "https://speedy-nodes-nyc.moralis.io/8446a7e044dc4043c63d04d8/polygon/mumbai");
        const USDC = new web3.eth.Contract(tUSDCAbi, tUSDCAddress);
        const Tycoons = new web3.eth.Contract(mintAbi, mintAddress);
        return { web3, USDC, Tycoons };
    }, [provider]);

    // Modal Controls - Connect and Disconnect Wallets
    const loadWeb3Modal = useCallback(async () => {
        const newProvider = await web3Modal.connect();
        console.log("Connected", newProvider);
        if (!!newProvider.wc) {
            setProvider(newProvider);
            setSignedInAddress(newProvider.accounts[0]);
        } else {
            setProvider(newProvider);
            setSignedInAddress(newProvider.selectedAddress);
        }
    }, [web3Modal]);
    const logoutOfWeb3Modal = useCallback(async () => {
        setSignedInAddress("");
        await web3Modal.clearCachedProvider();
        window.location.reload();
    }, [web3Modal]);

    useEffect(() => {
        console.log(provider);
        if (provider) {
            // Subscribe to accounts change
            provider.on("accountsChanged", accounts => {
                console.log("accountsChanged", accounts, provider);
            });
            // Subscribe to chainId change
            provider.on("chainChanged", chainId => {
                console.log("Provider Chain Changed", chainId, provider);
            });
            // Subscribe to provider connection
            provider.on("connect", info => {
                console.log("Provider Connected", info);
            });
            // Subscribe to provider disconnection
            provider.on("disconnect", error => {
                console.log("disconnect", error);
            });
        }
    }, [provider]);

    return (
        <Web3Context.Provider
            value={{
                loadWeb3Modal,
                logoutOfWeb3Modal,
                accountAddress: signedInAddress,
                setNetwork,
                USDC,
                Tycoons,
                web3,
            }}
        >
            {props.children}
        </Web3Context.Provider>
    );
};

// export default Web3ContextProvider;
export { Web3Context, Web3ContextProvider as default };
