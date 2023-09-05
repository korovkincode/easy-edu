import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Avatar, Grid } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserForm from "../components/UserForm";
import CourseCard from "../components/CourseCard";

const Profile = () => {
    const params = useParams();
    const courses = [
        {id: 1, name: "PE", teacher: "Sam Sulek", desc: "Daily: 3PM"},
        {id: 2, name: "Physics", teacher: "Albert Einstein", desc: "Daily: 1PM"},
        {id: 3, name: "Maths", teacher: "Euclid", desc: "Daily: 10AM"}
    ]; //Make API Request

    return (
        <Container maxWidth="sm">
			<Box sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center" }}>
                
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
					<AccountCircleIcon />
				</Avatar>
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>{params.username}</Typography>
                {localStorage.getItem("username") === params.username && 
                    <UserForm btnLabel="Сохранить изменения" type="change" />
                }
                <Typography component="h3" variant="h6" sx={{ mt: 3, alignSelf: "flex-start" }}>Состоит в курсах:</Typography>
                <Grid sx={{ mt: 2, mb: 3 }} container spacing={2}>
                    {courses.map((c, index) =>
                        <Grid item xs={12} key={index}>
                            <CourseCard card={c} key={index} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    )
}

export default Profile;