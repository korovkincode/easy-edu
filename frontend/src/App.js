import Register from "./pages/Register";
import "./styles/App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import { AuthContext } from "./context";
import { useState, useEffect } from "react";

function App() {
	const [username, setUsername] = useState("");
    
    useEffect(() => {
        if (localStorage.getItem("username")) setUsername(localStorage.getItem("username"));
    }, []);

	return (
		<AuthContext.Provider value={{
			username, setUsername
		}}>
			<Navbar />
			<Register />
		</AuthContext.Provider>
	)
}

export default App;