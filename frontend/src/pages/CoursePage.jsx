import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Card, CardHeader, CardContent, Grid, TextField, InputAdornment, IconButton, Avatar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link as LinkDOM } from "react-router-dom";
import { getTodayDate } from "../utils/date";
import { Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { APICall } from "../utils/API";

const CoursePage = () => {
    const {userToken, setUserToken} = useContext(AuthContext);
    const params = useParams();
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);

    const [courseData, setCourseData] = useState({id: params.cid, name: "", description: "", author: {}});
    const content = [
        {type: "Announcement", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {type: "Task", id: 1, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {type: "Announcement", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {type: "Announcement", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {type: "Task", id: 2, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2023"}
    ];

    useEffect(() => {
        async function getCourseData() {
            const requestParams = {
                path: `http://127.0.0.1:8080/course/${params.cid}`,
                method: "GET",
            };
            const responseJSON = await APICall(requestParams);
            setCourseData({
                ...courseData,
                name: responseJSON.data.course.name,
                description: responseJSON.data.course.description,
                author: {
                    name: responseJSON.data.author.name + " " + responseJSON.data.author.surname,
                    username: responseJSON.data.author.username
                }
            });
        }
        getCourseData();
        setComment("");
        setAllComments([]);
    }, [params.cid]);

    const addComment = () => {
        setAllComments([
            ...allComments,
            {
                username: localStorage.getItem("username"), 
                comment: comment,
                date: getTodayDate()
            }
        ]);
        setComment("");
    }

    const theme = useTheme();
    let charSlice;
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
    const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
    if (greaterThanMid) charSlice = 80;
    else if (smallToMid) charSlice = 40;
    else if (lessThanSmall) charSlice = 15;

    
    return (
        <Container disableGutters maxWidth="lg">
			<Box sx={{		
                display: "flex",
				flexDirection: "column",
				alignItems: "center"
            }}>
                <div className="course__wrap">
                    <div className="course__bg">
                        <div className="course__text">
                            <div className="course__name">{courseData.name}</div>
                            <div className="course__teacher">
                                <LinkDOM to={`/profile/${courseData.author.username}`}>
                                    {courseData.author.name}
                                </LinkDOM>
                            </div>
                        </div>
                    </div>
                </div>
                <Grid sx={{ mt: 1 }} container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">
                                    Announcements
                                </Typography>
                                <Typography sx={{ mt: 2 }} color="text.primary">
                                    No current announcements
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <TextField value={comment} onChange={e => setComment(e.target.value)} 
                                    fullWidth placeholder="Leave a comment" 
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle sx={{ fontSize: "36px" }} color="secondary" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={addComment} color="primary">
                                                        <SendIcon />
                                                    </IconButton>              
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Card>
                            </Grid>
                            {allComments.length > 0 &&
                                <Typography sx={{ mt: 2, ml: 2 }} variant="h5" color="text.secondary">
                                    Commentaries
                                </Typography>
                            }
                            <Grid item xs={12}>
                                {allComments.map(c => 
                                    <Card sx={{ mb: 1.5, border: "1px solid #A8A8A8" }}>
                                        <CardHeader 
                                            title={
                                                <Typography sx={{ ml: -1, fontSize: 16 }}>
                                                    <LinkDOM to={`/profile/${c.username}`}>
                                                        {c.username}
                                                    </LinkDOM>
                                                </Typography>
                                            }
                                            subheader={
                                                <Typography sx={{ ml: -1, fontSize: 14 }} color="text.secondary">
                                                    {c.date.split(" ")[2] == new Date().getFullYear()
                                                    ? c.date.replace(new Date().getFullYear().toString(), "")
                                                    : c.date}
                                                </Typography>
                                            }
                                            avatar={<AccountCircle sx={{ fontSize: "45px", verticalAlign: "middle" }} />}
                                        />
                                        <CardContent sx={{ mt: -2 }}>
                                            <Typography color="text.primary">
                                                {c.comment}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )}
                            </Grid>
                            <Typography sx={{ mt: 2.5, ml: 2 }} variant="h5" color="text.secondary">
                                Materials
                            </Typography>
                            {content.length > 0
                                ?
                                <Grid item xs={12}>
                                    {content.map(c =>
                                        c.type === "Announcement"
                                        ?
                                            <Card sx={{ mb: 1.5, border: "1px solid #A8A8A8" }}>
                                                <CardHeader 
                                                    title={
                                                        <Typography sx={{ ml: -1, fontSize: 16 }}>
                                                            {courseData.author.name}
                                                        </Typography>
                                                    }
                                                    subheader={
                                                        <Typography sx={{ ml: -1, fontSize: 14 }} color="text.secondary">
                                                            {c.date.split(" ")[2] == new Date().getFullYear()
                                                            ? c.date.replace(new Date().getFullYear().toString(), "")
                                                            : c.date}
                                                        </Typography>
                                                    }
                                                    avatar={<AccountCircle sx={{ fontSize: "45px", verticalAlign: "middle" }} />}
                                                />
                                                <CardContent sx={{ mt: -2 }}>
                                                    <Typography color="text.primary">
                                                        {c.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        :
                                            <Card className="course__task" sx={{ mb: 1.5, border: "1px solid #A8A8A8" }}>
                                                <LinkDOM to={`/course/${params.cid}/task/${c.id}`}>
                                                <CardHeader
                                                    title={
                                                        <Typography sx={{ ml: -1 }}>
                                                            {courseData.author.name} posted <b>
                                                            {c.description.slice(0, charSlice) + (c.description.length <= charSlice ? "": "...")}
                                                            </b>
                                                        </Typography>
                                                    }
                                                    subheader={
                                                        <Typography sx={{ ml: -1, fontSize: 14 }} color="text.secondary">
                                                            {c.date.split(" ")[2] == new Date().getFullYear()
                                                            ? c.date.replace(new Date().getFullYear().toString(), "")
                                                            : c.date}
                                                        </Typography>
                                                    }
                                                    avatar={
                                                        <Avatar sx={{ width: "42px", height: "42px", bgcolor: "#1976D2" }}>
                                                            <AssignmentIcon />
                                                        </Avatar>
                                                    }
                                                />
                                                </LinkDOM>
                                            </Card>
                                    )}
                                </Grid>
                                :
                                <Typography sx={{ mt: 2, ml: 2 }} variant="h5">
                                    It is empty here yet
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default CoursePage;