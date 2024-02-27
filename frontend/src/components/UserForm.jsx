import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserForm = ({btnLabel, type}) => {
    const [userData, setUserData] = useState({name: "", surname: "", username: "", password: ""});
	const [error, setError] = useState("");
	const {username, setUsername} = useContext(AuthContext);
    const navigate = useNavigate();

    const regUser = e => {
		e.preventDefault();
		// Make API Request to Register New user
		for (let k in userData) {
			if (userData[k] === "") {
				setError("Fill in all the fields");
				return;
			}
		}
		localStorage.setItem("username", userData.username);
		setUsername(userData.username);
        if (type === "change") navigate(`/profile/${userData.username}`);
	}

    return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                {error !== "" &&
                    <Grid sx={{ mb: 2 }} item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }} color="error">
                            {error}
                        </Typography>
                    </Grid>
                }
                <Grid item xs={12} sm={6}>
                    <TextField required value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})}
                    fullWidth label="First Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required value={userData.surname} onChange={e => setUserData({...userData, surname: e.target.value})}
                    fullWidth label="Last Name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField required value={userData.username} onChange={e => setUserData({...userData, username: e.target.value})}
                    fullWidth label="Login" />
                </Grid>
                <Grid item xs={12}>
                    <TextField required value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})}
                    fullWidth label="Password" type="password" />
                </Grid>
            </Grid>
            <Button
                type="submit"
                onClick={regUser}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                {btnLabel}
            </Button>
        </Box>
    )
}

export default UserForm;