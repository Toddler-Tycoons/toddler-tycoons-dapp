// Deependencies import
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Importing components
import reportWebVitals from "./reportWebVitals";
import App from "./App";

// Importing styles
import "./styles/index.scss";

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Router>,
	document.getElementById("root"),
);

reportWebVitals();
