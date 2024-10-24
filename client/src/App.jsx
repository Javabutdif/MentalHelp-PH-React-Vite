//Layout
import LandingLayout from "./components/Layout/LandingLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import PatientLayout from "./components/Layout/PatientLayout";
import ProfessionalLayout from "./components/Layout/ProfessionalLayout";

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
import PrivateRouteProfessional from "./Route/PrivateRouteProfessional";

//Authentication
import Login from "./pages/Login";

//Admin
import AdminRegister from "./pages/Admin/AdminRegister";
import Dashboard from "./pages/Admin/Dashboard";
import Patient from "./pages/Admin/Patient";
import Professional from "./pages/Admin/Professional";
import NotFound from "./components/NotFound";
import AdminCommunity from "./pages/Admin/Community";
import AdminReport from "./pages/Admin/Reports";

//Patient
import PatientDashboard from "./pages/Patient/Dashboard";
import PatientSettings from "./pages/Patient/Settings";
import PatientProfile from "./pages/Patient/Profile";
import PatientCommunity from "./pages/Patient/Community";
import PatientNotification from "./pages/Patient/Notification";
//Professional
import ProfessionalDashboard from "./pages/Professional/Dashboard";
import ProfessionalProfile from "./pages/Professional/Profile";
import ProfessionalNotification from "./pages/Professional/Notification";

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
					<Route
						path="reports"
						element={<PrivateRouteAdmin element={AdminReport} />}
					/>
				</Route>
				<Route
					path="/patient/"
					element={<PrivateRoutePatient element={PatientLayout} />}>
					<Route
						path="dashboard"
						element={<PrivateRoutePatient element={PatientDashboard} />}
					/>
					<Route
						path="settings"
						element={<PrivateRoutePatient element={PatientSettings} />}
					/>
					<Route
						path="profile"
						element={<PrivateRoutePatient element={PatientProfile} />}
					/>
					<Route
						path="community"
						element={<PrivateRoutePatient element={PatientCommunity} />}
					/>
					<Route
						path="notification"
						element={<PrivateRoutePatient element={PatientNotification} />}
					/>
				</Route>
				<Route
					path="/professional/"
					element={<PrivateRouteProfessional element={ProfessionalLayout} />}>
					<Route
						path="dashboard"
						element={
							<PrivateRouteProfessional element={ProfessionalDashboard} />
						}
					/>
					<Route
						path="profile"
						element={<PrivateRouteProfessional element={ProfessionalProfile} />}
					/>
					<Route
						path="notification"
						element={
							<PrivateRouteProfessional element={ProfessionalNotification} />
						}
					/>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
