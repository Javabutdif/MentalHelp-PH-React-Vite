import { useState } from "react";
import LandingLayout from "./components/Layout/LandingLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import "./App.css";
import Home from "./pages/Home";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminRegister from "./pages/Admin/AdminRegister";
import PrivateRouteAdmin from "./Route/PrivateRouteAdmin";
import Dashboard from "./pages/Admin/Dashboard";
import Patient from "./pages/Admin/Patient";
import Professional from "./pages/Admin/Professional";
import NotFound from "./components/NotFound";
import AdminCommunity from "./pages/Admin/Community";
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
					element={<PrivateRouteAdmin element={AdminLayout} />}>
					<Route
						path="dashboard"
						element={<PrivateRouteAdmin element={Dashboard} />}
					/>
					<Route
						path="patient"
						element={<PrivateRouteAdmin element={Patient} />}
					/>
					<Route
						path="professional"
						element={<PrivateRouteAdmin element={Professional} />}
					/>
					<Route
						path="community"
						element={<PrivateRouteAdmin element={AdminCommunity} />}
					/>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
