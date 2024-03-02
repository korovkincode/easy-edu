import React from "react";
import { TextField, Button, Box, Avatar, Typography, Grid, Container, Link as LinkMUI } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState, useContext } from "react";
import { AuthContext } from "../context";
import { Link as LinkDOM } from "react-router-dom";

const Login = () => {
    const [userData, setUserData] = useState({username: null, password: null});
	const [error, setError] = useState("");
	const {userToken, setUserToken} = useContext(AuthContext);

    const logUser = async e => {
        e.preventDefault();
        setError("");
		for (let field in userData) {
			if (userData[field] === null || userData[field] === "") {
				setError("Fill in all the fields");
				return;
			}
		}
		// Make API Request to Login
		const response = await fetch("http://127.0.0.1:8080/user/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(userData)
        });
        const responseJSON = await response.json();
        if (responseJSON["response-type"] === "Error") {
            setError(responseJSON.description);
            return;
        }
        setUserToken(responseJSON.data);
		localStorage.setItem("username", userData.username);
		localStorage.setItem("userToken", responseJSON.data);
    }

    return (
        <Container maxWidth="xs">
			<Box sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center" }}>
				
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login to account
				</Typography>
				<Box component="form" noValidate sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						{error !== "" &&
							<Grid sx={{ mb: 2 }} item xs={12}>
								<Typography sx={{ fontWeight: "bold" }} color="error">
									{error}
								</Typography>
							</Grid>
						}
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
                        onClick={logUser}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Login
					</Button>
				</Box>
                <LinkDOM to="/signup"><LinkMUI variant="body2">Don't have an account yet? Signup</LinkMUI></LinkDOM>
			</Box>
	  </Container>
    )
}

export default Login;