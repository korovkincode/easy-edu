import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context";
import { IconButton, Typography, AppBar, Toolbar, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
    const {username, setUsername} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState({menu: null, add: null, profile: null});

    const logout = () => {
        setUsername("");
        localStorage.removeItem("username");
    }

    return (
        <AppBar sx={{ bgcolor: "#a8eb34", color: "black" }} position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={e => setAnchorEl({...anchorEl, menu: e.currentTarget})}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    EasyEdu
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={e => setAnchorEl({...anchorEl, add: e.currentTarget})}
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={e => setAnchorEl({...anchorEl, profile: e.currentTarget})}
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
            <Menu
                anchorEl={anchorEl.menu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorEl.menu)}
                onClose={() => setAnchorEl({...anchorEl, menu: null})}
            >
                <MenuItem onClick={() => setAnchorEl({...anchorEl, menu: null})}><Link to="/courses">Courses</Link></MenuItem>
                <MenuItem onClick={() => setAnchorEl({...anchorEl, menu: null})}>About Us</MenuItem>
            </Menu>
            <Menu
                anchorEl={anchorEl.add}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorEl.add)}
                onClose={() => setAnchorEl({...anchorEl, add: null})}
            >
                <MenuItem onClick={() => setAnchorEl({...anchorEl, add: null})}>Join</MenuItem>
                <MenuItem onClick={() => setAnchorEl({...anchorEl, add: null})}>Add</MenuItem>
            </Menu>
            <Menu
                anchorEl={anchorEl.profile}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorEl.profile)}
                onClose={() => setAnchorEl({...anchorEl, profile: null})}
            >
                {username !== ""
                ?   <>
                        <MenuItem onClick={() => setAnchorEl({...anchorEl, profile: null})}>
                            <Link to={`/profile/${username}`}>Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            setAnchorEl({...anchorEl, profile: null});
                            logout();
                        }}>
                            <ListItemText primary="Logout" />
                            <ListItemIcon>
                                <LogoutIcon sx={{ ml: 1 }} />
                            </ListItemIcon>
                        </MenuItem>
                    </>
                :   <Link to="/login">
                        <MenuItem onClick={() => setAnchorEl({...anchorEl, profile: null})}>
                            <ListItemText primary="Login" />
                            <ListItemIcon>
                                <LoginIcon sx={{ ml: 1 }} />
                            </ListItemIcon>
                        </MenuItem>
                    </Link>
                }
            </Menu>
        </AppBar>
    )
}

export default Navbar;