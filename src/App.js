// Importing dependencies
import { Routes, Route } from "react-router-dom";

// Importing components
import Home from "./components/Home";
import Mint from "./components/Mint";
import NotFound from "./components/NotFound";
import { Web3ContextProvider } from "./context/web3Context";
import Auctions from "./components/Auctions";
import Gallery from "./components/Gallery";

// Importing styles

const App = () => {
	return (
		<Web3ContextProvider>
			<div className="App">
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/auctions" element={<Auctions />} />
					<Route path="/mint" element={<Mint />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Web3ContextProvider>
	);
};

export default App;
