import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context";
import { Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { APICall } from "../utils/API";
import { useNavigate } from "react-router-dom";

const CourseForm = (props) => {
    const [postData, setPostData] = useState({name: "", description: ""});
    const [postAddError, setPostAddError] = useState("");
    const {userToken, setUserToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const createPost = async e => {
        e.preventDefault();
        setPostAddError("");
        for (let field in postData) {
			if (postData[field] === null || postData[field] === "") {
				setPostAddError("Fill in all the fields");
				return;
			}
		}
        const requestParams = {
            path: "http://127.0.0.1:8080/course",
            method: "POST",
            body: {
                authorToken: userToken, ...postData
            }
        };
        const responseJSON = await APICall(requestParams);
        if (responseJSON["response-type"] === "Error") {
            setPostAddError(responseJSON.description);
            return;
        }
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
                    {postAddError !== "" &&
                        <Grid sx={{ mt: 2, mb: -2 }} item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }} color="error">
                                {postAddError}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField required value={postData.name || ""} onChange={e => setPostData({...postData, name: e.target.value})}
                        fullWidth label="Course name" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required value={postData.description || ""} onChange={e => setPostData({...postData, description: e.target.value})}
                        fullWidth label="Course description" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" onClick={createPost}>
                            CREATE
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default CourseForm;