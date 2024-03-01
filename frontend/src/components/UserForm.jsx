import React from "react";
import dayjs from "dayjs";
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
    const navigate = useNavigate();
    const {userToken, setUserToken} = useContext(AuthContext);
    const requestParams = {};
    let birthdayInput, formatDate;

    useEffect(() => {
        async function getUserData() {
            requestParams.path = `http://127.0.0.1:8080/user/${userToken}`;
            requestParams.method = "GET";
            const response = await fetch(requestParams.path, {
                method: requestParams.method,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            });
            const responseJSON = await response.json();
            birthdayInput = responseJSON.data.birthday.split(".");
            formatDate = `${birthdayInput[2]}-${birthdayInput[1]}-${birthdayInput[0]}`;
            setUserData({...responseJSON.data, password: "", birthday: formatDate});
        }
        if (type === "change") getUserData();
    }, []);

    const regUser = async e => {
		e.preventDefault();
        setError("");
		for (let field in userData) {
			if (userData[field] === null || userData[field] === "") {
				setError("Fill in all the fields");
				return;
			}
		}
        if (typeof userData.birthday === "string") {
            birthdayInput = userData.birthday.split("-");
            formatDate = `${birthdayInput[2]}.${birthdayInput[1]}.${birthdayInput[0]}`;
        } else {
            formatDate = `${Math.floor(userData.birthday.$D / 10)}${userData.birthday.$D % 10}.${Math.floor((userData.birthday.$M + 1) / 10)}${(userData.birthday.$M + 1) % 10}.${userData.birthday.$y}`;
        }
        // Make API Request to Register New user
        requestParams.path = "http://127.0.0.1:8080/user";
        if (type === "signup") requestParams.method = "POST";
        else requestParams.method = "PUT";
        const response = await fetch(requestParams.path, {
            method: requestParams.method,
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                ...userData, userToken: userToken, birthday: formatDate
            })
        });
        const responseJSON = await response.json();
        if (responseJSON["response-type"] === "Error") {
            setError(responseJSON.description);
            return;
        }
		localStorage.setItem("username", userData.username);
        if (type === "signup") setUserToken(responseJSON.data);
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
                    <TextField required value={userData.name || ""} onChange={e => setUserData({...userData, name: e.target.value})}
                    fullWidth label="First Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required value={userData.surname || ""} onChange={e => setUserData({...userData, surname: e.target.value})}
                    fullWidth label="Last Name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField required value={userData.username || ""}
                    onChange={e => setUserData({...userData, username: e.target.value})}
                    fullWidth label="Login"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField required value={userData.password || ""}
                    onChange={e => setUserData({...userData, password: e.target.value})}
                    fullWidth label="Password" type="password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DatePicker required value={dayjs(userData.birthday)}
                        onChange={e => setUserData({...userData, birthday: e})}
                        slotProps={{textField: {fullWidth: true, required: true, error: false}}} label="Birthday" />
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