import { useState } from "react";
import LandingLayout from "./components/Layout/LandingLayout";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingLayout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
