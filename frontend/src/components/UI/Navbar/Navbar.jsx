import React, { useContext } from "react";
import { AuthContext } from "../../../context";
import { Button } from "@mui/material";

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
                    <div>Привет, <b>{username}</b></div>
                    <div className="nav__right">
                        <Button color="secondary" variant="outlined" size="small" onClick={logout}>Выйти</Button>
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