// Importing dependencies
import { Routes, Route } from "react-router-dom";

// Importing components
import Home from "./components/Home";
import Mint from "./components/Mint";
import NotFound from "./components/NotFound";

// Importing styles

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/mint" element={<Mint />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default App;
