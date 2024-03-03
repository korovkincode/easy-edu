import React from "react";
import { useState } from "react";
import { Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const CourseForm = () => {
    const [postData, setPostData] = useState({name: "", subject: "", description: ""});
    const [postAddError, setPostAddError] = useState("");

    const createPost = (e) => {
        e.preventDefault();
        setPostAddError("");
        for (let field in postData) {
			if (postData[field] === null || postData[field] === "") {
				setPostAddError("Fill in all the fields");
				return;
			}
		}
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
                        <TextField required value={postData.subject || ""} onChange={e => setPostData({...postData, subject: e.target.value})}
                        fullWidth label="Course subject" />
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