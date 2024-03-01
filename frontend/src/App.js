import Register from "./pages/Register";
import "./styles/App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import { AuthContext } from "./context";
import { useState, useEffect } from "react";
import Courses from "./pages/Courses";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
	const [userToken, setUserToken] = useState("");

	return (
		<AuthContext.Provider value={{
			userToken, setUserToken
		}}>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App;