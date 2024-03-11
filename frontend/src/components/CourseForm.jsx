import React from "react";
import { useState, useContext } from "react";
import { AuthContext, CourseCountContext } from "../context";
import { Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { APICall } from "../utils/API";
import { useNavigate } from "react-router-dom";

const CourseForm = (props) => {
    const [courseData, setCourseData] = useState({name: "", description: ""});
    const [formStatus, setFormStatus] = useState({type: "", description: ""});
    const [[userToken, setUserToken], [secretToken, setSecretToken]] = useContext(AuthContext);
    const [courseCount, setCourseCount] = useContext(CourseCountContext);
    const navigate = useNavigate();

    const createCourse = async e => {
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
            path: "http://127.0.0.1:8080/course",
            method: "POST",
            body: {
                authorToken: userToken, ...courseData
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
        setCourseCount(courseCount + 1);
        props.onSuccess(0);
        navigate(`/course/${responseJSON.data}`);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <AddOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Create a course
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
                        <TextField required value={courseData.name || ""} onChange={e => setCourseData({...courseData, name: e.target.value})}
                        fullWidth label="Course name" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required value={courseData.description || ""} onChange={e => setCourseData({...courseData, description: e.target.value})}
                        fullWidth label="Course description" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" onClick={createCourse}>
                            CREATE
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default CourseForm;