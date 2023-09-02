import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context";
import { TextField, Button, Box, Avatar, Typography, Grid, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Register = () => {
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
		<Container component="main" maxWidth="xs">
		<Box sx={{
			marginTop: 8,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center' }} >
			
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Регистрация
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
					<Grid item xs={12} sm={6}>
						<TextField value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})}
						fullWidth label="Имя" />
			  		</Grid>
					<Grid item xs={12} sm={6}>
						<TextField value={userData.surname} onChange={e => setUserData({...userData, surname: e.target.value})}
						fullWidth label="Фамилия" />
			  		</Grid>
			  		<Grid item xs={12}>
						<TextField value={userData.username} onChange={e => setUserData({...userData, username: e.target.value})}
						fullWidth label="Логин" />
			  		</Grid>
			  		<Grid item xs={12}>
						<TextField value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})}
						fullWidth label="Пароль" type="password" />
					</Grid>
				</Grid>
				<Button
					type="submit"
					onClick={regUser}
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}>
					Зарегистрироваться
				</Button>
			</Box>

		</Box>
	  </Container>
	)
}

export default Register;