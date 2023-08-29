import React, { useContext } from "react";
import { AuthContext } from "../../../context";

const Navbar = () => {
    const {username, setUsername} = useContext(AuthContext);
    
    return (
        <div className="navbar">
            {username !== "" &&
                <>
                    <div>{username}</div>
                    <div className="nav__right">
                        <button onClick={() => setUsername("")}>Выйти</button>
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