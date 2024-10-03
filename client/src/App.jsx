import { useState } from "react";
import LandingLayout from "./components/Layout/LandingLayout";
import "./App.css";
import Home from "./pages/Home";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminRegister from "./pages/Admin/AdminRegister";
import PrivateRouteAdmin from "./Route/PrivateRouteAdmin";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import Dashboard from "./pages/Admin/Dashboard";
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
					<Route path="/admin/register" element={<AdminRegister />} />
				</Route>
				<Route
					path="/admin/"
					element={<PrivateRouteAdmin element={AdminNavbar} />}>
					<Route
						path="dashboard"
						element={<PrivateRouteAdmin element={Dashboard} />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
