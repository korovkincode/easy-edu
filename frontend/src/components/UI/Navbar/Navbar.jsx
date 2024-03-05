import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context";
import { IconButton, Typography, AppBar, Toolbar, Menu, MenuItem, ListItemIcon, ListItemText, Modal, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CourseForm from "../../CourseForm";
import CourseJoin from "../../CourseJoin";
import { Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ModalStyle = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState({menu: null, add: null, profile: null});    
    const [courseJoin, setCourseJoin] = useState(0);
    const [courseAdd, setCourseAdd] = useState(0);
    const theme = useTheme();
    const location = useLocation();
    const {userToken, setUserToken} = useContext(AuthContext);
    const username = localStorage.getItem("username");

    const logout = () => {
        setUserToken("");
        localStorage.removeItem("username");
        localStorage.removeItem("userToken");
    }

    return (
        <>
            <Modal open={courseAdd} onClose={() => setCourseAdd(0)}>
                <Box sx={{
                    ...ModalStyle, top: "50%", left: "50%"
                }}>
                    <CourseForm onSuccess={setCourseAdd} />
                </Box>
            </Modal>
            <Modal open={courseJoin} onClose={() => setCourseJoin(0)}>
                <Box sx={{
                    ...ModalStyle,
                    ...(useMediaQuery(theme.breakpoints.down("md"))
                        ? {
                            top: "50%",
                            left: "50%"
                        }
                        : {
                            top: "200px",
                            right: "-110px"
                        }
                    )
                }}>
                    <CourseJoin onSuccess={setCourseJoin} />
                </Box>
            </Modal>
            <AppBar sx={{ bgcolor: "#a8eb34", color: "black" }} position="static">
                <Toolbar>
                    <IconButton
                        size="large" edge="start"
                        color="inherit" sx={{ mr: 2 }}
                        onClick={e => setAnchorEl({...anchorEl, menu: e.currentTarget})}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EasyEdu
                    </Typography>
                    {location.pathname === "/courses" && 
                        <IconButton
                            size="large" edge="start"
                            color="inherit" sx={{ mr: 2 }}
                            onClick={e => setAnchorEl({...anchorEl, add: e.currentTarget})}
                        >
                            <AddIcon />
                        </IconButton>
                    }
                    <IconButton
                        size="large" edge="start"
                        color="inherit" onClick={e => setAnchorEl({...anchorEl, profile: e.currentTarget})}
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
                {location.pathname === "/courses" &&
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
                        <MenuItem onClick={() => {
                            setAnchorEl({...anchorEl, add: null});
                            setCourseJoin(1);
                        }}>
                            Join a course
                        </MenuItem>
                        <MenuItem onClick={() => {
                            setAnchorEl({...anchorEl, add: null});
                            setCourseAdd(1);
                        }}>
                            Create
                        </MenuItem>
                    </Menu>
                }
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
                    {userToken !== ""
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
        </>
    )
}

export default Navbar;