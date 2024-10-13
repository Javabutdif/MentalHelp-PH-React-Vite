//Layout
import LandingLayout from "./components/Layout/LandingLayout";
import AdminLayout from "./components/Layout/AdminLayout";

//CSS
import "./App.css";

//Landing
import Home from "./pages/Home";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";

//Routing
import PrivateRouteAdmin from "./Route/PrivateRouteAdmin";
import PrivateRoutePatient from "./Route/PrivateRoutePatient";

//Authentication
import Login from "./pages/Login";

//Admin
import AdminRegister from "./pages/Admin/AdminRegister";
import Dashboard from "./pages/Admin/Dashboard";
import Patient from "./pages/Admin/Patient";
import Professional from "./pages/Admin/Professional";
import NotFound from "./components/NotFound";
import AdminCommunity from "./pages/Admin/Community";

//Patient
import PatientLayout from "./components/Layout/PatientLayout";
import PatientDashboard from "./pages/Patient/Dashboard";

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
				<Route
					path="/patient/"
					element={<PrivateRoutePatient element={PatientLayout} />}>
					<Route
						path="dashboard"
						element={<PrivateRoutePatient element={PatientDashboard} />}
					/>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
