import Register from "./pages/Register";
import "./styles/App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import { AuthContext, CourseCountContext } from "./context";
import { useState, useEffect } from "react";
import Courses from "./pages/Courses";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
	const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || "");
	const [secretToken, setSecretToken] = useState(localStorage.getItem("secretToken") || "");
	const [courseCount, setCourseCount] = useState(0);

	useEffect(() => {
		localStorage.setItem("userToken", userToken);
		localStorage.setItem("secretToken", secretToken);
	}, [userToken, secretToken]);

	return (
		<AuthContext.Provider value={[
			[userToken, setUserToken], [secretToken, setSecretToken]
		]}>
			<CourseCountContext.Provider value={
				[courseCount, setCourseCount]
			}>
				<BrowserRouter>
					<Navbar />
					<AppRouter />
				</BrowserRouter>
			</CourseCountContext.Provider>
		</AuthContext.Provider>
	)
}

export default App;