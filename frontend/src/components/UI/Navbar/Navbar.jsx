import React, { useContext } from "react";
import { AuthContext } from "../../../context";

const Navbar = () => {
    const {username, setUsername} = useContext(AuthContext);
    
    return (
        <div className="navbar">
            {username !== "" &&
                <h5>{username}</h5>
            }
            {username === "" &&
                <h5>Войти</h5>
            }
        </div>
    )
}

export default Navbar;