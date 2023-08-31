import React, { useContext } from "react";
import { AuthContext } from "../../../context";

const Navbar = () => {
    const {username, setUsername} = useContext(AuthContext);
    
    const logout = () => {
        setUsername("");
        localStorage.removeItem("username");
    }

    return (
        <div className="navbar">
            {username !== "" &&
                <>
                    <div>{username}</div>
                    <div className="nav__right">
                        <button onClick={logout}>Выйти</button>
                    </div>
                </>
            }
            {username === "" &&
                <span>Войти</span>
            }
        </div>
    )
}

export default Navbar;