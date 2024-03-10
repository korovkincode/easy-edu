import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Avatar, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserForm from "../components/UserForm";
import CourseCard from "../components/CourseCard";
import { APICall, GetUserCourses } from "../utils/API";

const Profile = () => {
    const [signedUp, setSignedUp] = useState("");
    const params = useParams();
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        async function getUserCourses() {
            const requestParams = {
                path: `http://127.0.0.1:8080/user/${params.username}?idType=username`,
                method: "GET",
            };
            const responseJSON = await APICall(requestParams);
            setUserCourses(await GetUserCourses(responseJSON.data.userToken));
        }
        getUserCourses();
    }, [params.username]);

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
                    <UserForm btnLabel="Save Changes" type="change" callback={setSignedUp} />
                }
                <Typography component="h3" variant="h6" sx={{ mt: 3, alignSelf: "flex-start" }}>Subscribed to courses:</Typography>
                <Grid sx={{ mt: 2, mb: 3 }} container spacing={2}>
                    {userCourses.map((c, index) =>
                        <Grid item xs={12} key={index}>
                            <CourseCard card={c} key={index} />
                        </Grid>
                    )}
                </Grid>
                <Typography variant="h6" sx={{ mt: 3, mb: 3, alignSelf: "flex-end" }}>Signed up: {signedUp}</Typography>
            </Box>
        </Container>
    )
}

export default Profile;