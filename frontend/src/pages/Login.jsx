import React from "react";
import { TextField, Button, Box, Avatar, Typography, Grid, Container, Link as LinkMUI } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState, useContext } from "react";
import { AuthContext } from "../context";
import { Link as LinkDOM } from "react-router-dom";

const Login = () => {
    const [userData, setUserData] = useState({username: "", password: ""});
	const [error, setError] = useState("");
	const {username, setUsername} = useContext(AuthContext);

    const logUser = e => {
        e.preventDefault();
        // Make API Request to Login
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
					Войти в аккаунт
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
							fullWidth label="Логин" />
						</Grid>
						<Grid item xs={12}>
							<TextField required value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})}
							fullWidth label="Пароль" type="password" />
						</Grid>
					</Grid>
					<Button
						type="submit"
                        onClick={logUser}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Войти
					</Button>
				</Box>
                <LinkDOM to="/signup"><LinkMUI variant="body2">Ещё нет аккаунта? Зарегистрироваться</LinkMUI></LinkDOM>
			</Box>
	  </Container>
    )
}

export default Login;