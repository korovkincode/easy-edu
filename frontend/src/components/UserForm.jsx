import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

const UserForm = ({btnLabel, type}) => {
    const [userData, setUserData] = useState({
        name: null, surname: null, username: null, password: null, birthday: null
    });
	const [error, setError] = useState("");
	const {username, setUsername} = useContext(AuthContext);
    const navigate = useNavigate();

    const regUser = async e => {
		e.preventDefault();
		for (let field in userData) {
			if (userData[field] === null) {
				setError("Fill in all the fields");
				return;
			}
		}
        const formatDate = `${Math.floor(userData.birthday.$D / 10)}${userData.birthday.$D % 10}.${Math.floor((userData.birthday.$M + 1) / 10)}${(userData.birthday.$M + 1) % 10}.${userData.birthday.$y}`;
        console.log(userData, formatDate);
        // Make API Request to Register New user
        const response = await fetch("http://127.0.0.1:8080/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                ...userData, birthday: formatDate
            })
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
		localStorage.setItem("username", userData.username);
		setUsername(userData.username);
        if (type === "change") navigate(`/profile/${userData.username}`);
	}

    return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="center">
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
                <Grid item xs={12}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DatePicker required value={userData.birthday}
                        onChange={e => setUserData({...userData, birthday: e})}
                        slotProps={{textField: {fullWidth: true}}} label="Birthday" />
                    </LocalizationProvider>
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