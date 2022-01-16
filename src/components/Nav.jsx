// Dependencies
import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { Web3Context } from "../context/web3Context2";

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
    // const { account, getWeb3ModalProvider, networkId, disconnectProvider } =
    // 	useContext(Web3Context);
    const { loadWeb3Modal, logoutOfWeb3Modal, accountAddress, setNetwork, USDC, Tycoons, web3 } = useContext(Web3Context);

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
                {accountAddress ? (
                    <>
                        {/* {networkId === "80001" ? <div className="network">Polygon Testnet</div> : <div className="network danger">Wrong Network</div>} */}
                        <div className="address">{accountAddress}</div>

                        <button className="logout-btn" onClick={logoutOfWeb3Modal}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="connect-btns">
                        {/* <button onClick={getWeb3ModalProvider}>Connect .eth</button> */}
                        <button onClick={loadWeb3Modal} className="wallet-btn">
                            Connect Wallet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
