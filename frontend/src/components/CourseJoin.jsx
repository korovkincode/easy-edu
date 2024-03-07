import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context";
import { Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAlt';
import { APICall } from "../utils/API";
import { useNavigate } from "react-router-dom";

const CourseJoin = (props) => {
    const [courseData, setCourseData] = useState({token: ""});
    const [formStatus, setFormStatus] = useState({type: "", description: ""});
    const {userToken, setUserToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const joinCourse = async e => {
        e.preventDefault();
        setFormStatus({type: "", description: ""});
        for (let field in courseData) {
			if (courseData[field] === null || courseData[field] === "") {
				setFormStatus({
                    type: "error",
                    description: "Fill in all the fields"
                });
				return;
			}
		}
        const requestParams = {
            path: "http://127.0.0.1:8080/user/join",
            method: "POST",
            body: {
                userToken: userToken, courseToken: courseData.token
            }
        };
        const responseJSON = await APICall(requestParams);
        if (responseJSON["response-type"] === "Error") {
            setFormStatus({
                type: "error",
                description: responseJSON.description
            });
            return;
        }
        props.onSuccess(0);
        navigate(`/course/${courseData.token}`);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <PeopleAltOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Join a course
            </Typography>
            <Box component="form" noValidate>
                <Grid container spacing={2}>
                    {formStatus.description !== "" &&
                        <Grid sx={{ mt: 2, mb: -2 }} item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }} color={`${formStatus.type}.main`}>
                                {formStatus.description}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField required value={courseData.token || ""} onChange={e => setCourseData({...courseData, token: e.target.value})}
                        fullWidth label="Course token" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" onClick={joinCourse}>
                            Join
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default CourseJoin;