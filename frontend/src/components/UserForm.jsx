import React from "react";
import dayjs from "dayjs";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { APICall } from "../utils/API";
import { getTodayDate } from "../utils/date";

const UserForm = ({btnLabel, type, callback = () => {}}) => {
    const [userData, setUserData] = useState({
        name: null, surname: null, username: null,
        password: null, previousPassword: null, birthday: null
    });
	const [formStatus, setFormStatus] = useState({type: "", description: ""});
    const navigate = useNavigate();
    const {userToken, setUserToken} = useContext(AuthContext);
    let birthdayInput, formatDate;

    useEffect(() => {
        async function getUserData() {
            const requestParams = {
                path: `http://127.0.0.1:8080/user/${userToken}`,
                method: "GET",
            };
            const responseJSON = await APICall(requestParams);
            birthdayInput = responseJSON.data.birthday.split(".");
            formatDate = `${birthdayInput[2]}-${birthdayInput[1]}-${birthdayInput[0]}`;
            setUserData({...responseJSON.data, password: "", birthday: formatDate});
            callback(responseJSON.data.signedUp);
        }
        if (type === "change") getUserData();
    }, []);

    const regUser = async e => {
		e.preventDefault();
        setFormStatus({type: "", description: ""});
		for (let field in userData) {
            if (field === "previousPassword" && type === "signup") continue;
			if (userData[field] === null || userData[field] === "") {
				setFormStatus({
                    type: "error",
                    description: "Fill in all the fields"
                });
				return;
			}
		}
        if (typeof userData.birthday === "string") {
            birthdayInput = userData.birthday.split("-");
            formatDate = `${birthdayInput[2]}.${birthdayInput[1]}.${birthdayInput[0]}`;
        } else {
            formatDate = `${Math.floor(userData.birthday.$D / 10)}${userData.birthday.$D % 10}.${Math.floor((userData.birthday.$M + 1) / 10)}${(userData.birthday.$M + 1) % 10}.${userData.birthday.$y}`;
        }
        const requestParams = {
            path: "http://127.0.0.1:8080/user",
            method: type === "signup" ? "POST" : "PUT",
            body: {
                ...userData,
                userToken: userToken, birthday: formatDate,
                signedUp: type == "signup" ? getTodayDate() : null
            },
        };
        const responseJSON = await APICall(requestParams);
        if (responseJSON["response-type"] === "Error") {
            setFormStatus({
                type: "error",
                description: responseJSON.description
            });
            return;
        }
        setFormStatus({
            type: "success",
            description: responseJSON.description
        })
		localStorage.setItem("username", userData.username);
        if (type === "signup") {
            localStorage.setItem("userToken", responseJSON.data);
            setUserToken(responseJSON.data);
        }
	}

    return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="center">
                {formStatus.description !== "" &&
                    <Grid sx={{ mb: 2 }} item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }} color={`${formStatus.type}.main`}>
                            {formStatus.description}
                        </Typography>
                    </Grid>
                }
                <Grid item xs={12} sm={6}>
                    <TextField
                        required value={userData.name || ""}
                        onChange={e => setUserData({...userData, name: e.target.value})}
                        fullWidth label="First Name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required value={userData.surname || ""}
                        onChange={e => setUserData({...userData, surname: e.target.value})}
                        fullWidth label="Last Name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required value={userData.username || ""}
                        onChange={e => setUserData({...userData, username: e.target.value})}
                        fullWidth label="Login"
                    />
                </Grid>
                {type === "change" &&
                    <Grid item xs={12}>
                        <TextField
                            required value={userData.previousPassword || ""}
                            onChange={e => setUserData({...userData, previousPassword: e.target.value})}
                            fullWidth label="Previous password" type="password"
                        />
                    </Grid>
                }
                <Grid item xs={12}>
                    <TextField
                        required value={userData.password || ""}
                        onChange={e => setUserData({...userData, password: e.target.value})}
                        fullWidth label="Password" type="password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DatePicker
                            required value={dayjs(userData.birthday)}
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