import React from "react";
import { Box, Avatar, Typography, Container, Link as LinkMUI} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as LinkDOM } from "react-router-dom";
import UserForm from "../components/UserForm";

const Register = () => {

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
					Signup
				</Typography>
				<UserForm btnLabel="Signup" type="signup" />
				<LinkDOM to="/login"><LinkMUI variant="body2">Already have an account? Login</LinkMUI></LinkDOM>
			</Box>
	  </Container>
	)
}

export default Register;