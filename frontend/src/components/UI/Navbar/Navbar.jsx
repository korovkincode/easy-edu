import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext, CourseCountContext } from "../../../context";
import { IconButton, Typography, AppBar, Toolbar, Menu, MenuItem } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Modal, Box, Drawer, Avatar, CardHeader, Divider } from "@mui/material";
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
import { GetUserCourses } from "../../../utils/API";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

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
    const [sideBar, setSideBar] = useState(0);
    const [userCourses, setUserCourses] = useState([]);
    const [courseJoin, setCourseJoin] = useState(0);
    const [courseAdd, setCourseAdd] = useState(0);
    const theme = useTheme();
    const location = useLocation();
    const [[userToken, setUserToken], [secretToken, setSecretToken]] = useContext(AuthContext);
    const [courseCount, setCourseCount] = useContext(CourseCountContext);
    const username = localStorage.getItem("username");

    useEffect(() => {
        async function updateCourses() {
            setUserCourses(await GetUserCourses(userToken));
            setCourseCount(userCourses.length);
        }
        if (userToken !== null && userToken !== "") updateCourses();
    }, [userToken, courseCount]);

    const logout = () => {
        setUserToken("");
        setSecretToken("");
        localStorage.removeItem("username");
        localStorage.removeItem("userToken");
        localStorage.removeItem("secretToken");
    }

    const DrawerMenu = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem key="label" sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                        <SchoolOutlinedIcon sx={{ ml: -1, mr: 2 }} />
                        Your courses
                    </Typography>
                </ListItem>
                <Divider />
                {userCourses.map((courseItem, index) => (
                    <ListItem key={courseItem.course.courseToken}>
                        <Link to={`/course/${courseItem.course.courseToken}`}>
                            <ListItemButton onClick={() => setSideBar(0)}>
                                <ListItemIcon>
                                    <Avatar sx={{ bgcolor: "primary.main" }}>
                                        {courseItem.course.name[0]}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText>
                                    <CardHeader
                                        title={
                                            <Typography sx={{ ml: -1, fontSize: 16 }}>
                                                {courseItem.course.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography sx={{ ml: -1, fontSize: 14 }} color="text.secondary">
                                                {courseItem.author.name + " " + courseItem.author.surname}
                                            </Typography>
                                        }
                                    />
                                </ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

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
            <Drawer open={sideBar && userToken} onClose={() => setSideBar(0)}>
                {DrawerMenu}
            </Drawer>
            <AppBar sx={{ bgcolor: "white", color: "black" }} position="static">
                <Toolbar>
                    <IconButton
                        size="large" edge="start"
                        color="inherit"
                        onClick={e => {
                            setAnchorEl({...anchorEl, menu: e.currentTarget});
                            setSideBar(1);
                    }}>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/courses">
                        <img src="/logo.png" width="76px" height="50px" />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ ml: 1, flexGrow: 1 }}>
                        <Link to="/courses" className="underline">Class</Link>
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
                    onClose={() => {
                        setAnchorEl({...anchorEl, profile: null});
                        setSideBar(0);
                }}>
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