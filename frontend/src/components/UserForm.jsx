import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";

const UserForm = ({btnLabel, type}) => {
    const [userData, setUserData] = useState({name: "", surname: "", username: "", password: ""});
	const [error, setError] = useState("");
	const {username, setUsername} = useContext(AuthContext);

    const regUser = e => {
		e.preventDefault();
		// Make API Request to Register New user
		for (let k in userData) {
			if (userData[k] === "") {
				setError("Заполните все поля");
				return;
			}
		}
		localStorage.setItem("username", userData.username);
		setUsername(userData.username);
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
                    fullWidth label="Имя" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required value={userData.surname} onChange={e => setUserData({...userData, surname: e.target.value})}
                    fullWidth label="Фамилия" />
                </Grid>
                <Grid item xs={12}>
                    <TextField required value={userData.username} onChange={e => setUserData({...userData, username: e.target.value})}
                    fullWidth label="Логин" />
                </Grid>
                <Grid item xs={12}>
                    <TextField required value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})}
                    fullWidth label="Пароль" type="password" />
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