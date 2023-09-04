import React, { useContext } from "react";
import { AuthContext } from "../../../context";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
                <Link to="/signup"><Typography component="h4" variant="h7">Войти</Typography></Link>
            }
        </div>
    )
}

export default Navbar;