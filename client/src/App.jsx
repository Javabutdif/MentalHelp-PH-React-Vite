import { useState } from "react";
import LandingLayout from "./components/Layout/LandingLayout";
import "./App.css";
import Home from "./pages/Home";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingLayout />}>
					<Route index element={<Home />} />
					<Route path="/community" element={<Community />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
