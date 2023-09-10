import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Card, CardContent, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from '@mui/icons-material/Send';
import AssignmentIcon from '@mui/icons-material/Assignment';

const CoursePage = () => {
    const params = useParams();
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);

    //Make API Request
    const course = {id: params.id, name: "11A: PE", teacher: "Sam Sulek", desc: "Daily 3PM"};
    const content = [{ttype: "Announcement", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {ttype: "Task", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {ttype: "Announcement", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {ttype: "Announcement", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {ttype: "Task", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
    ];

    const addComment = () => {
        setAllComments([...allComments, {name: localStorage.getItem("username"), comm: comment}]);
        setComment("");
    }

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
                            <div className="course__name">{course.name}</div>
                            <div className="course__teacher">{course.teacher}</div>
                        </div>
                    </div>
                </div>
                <Grid sx={{ mt: 1 }} container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">
                                    Объявления
                                </Typography>
                                <Typography sx={{ mt: 2 }} color="text.primary">
                                    Нет текущих объявлений
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <TextField value={comment} onChange={e => setComment(e.target.value)} 
                                    fullWidth placeholder="Оставьте комментарий" 
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle color="secondary" />
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
                            <Grid item xs={12}>
                                {allComments.map(c => 
                                    <Card sx={{ mb: 3, border: "1px solid #A8A8A8" }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.disabled" gutterBottom>
                                                <AccountCircle sx={{ verticalAlign: "middle", mr: 1 }} />
                                                {c.name}
                                            </Typography>
                                            <Typography color="text.primary">
                                                {c.comm}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {content.map(c =>
                                    c.ttype === "Announcement"
                                    ?
                                        <Card sx={{ mb: 3, border: "1px solid #A8A8A8" }}>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color="text.disabled" gutterBottom>
                                                    <AccountCircle sx={{ verticalAlign: "middle", mr: 1 }} />
                                                    {course.teacher}
                                                </Typography>
                                                <Typography color="text.primary">
                                                    {c.desc}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    :
                                        <Card sx={{ mb: 3, border: "1px solid #A8A8A8" }}>
                                            <CardContent>
                                                <Typography color="text.primary">
                                                    <AssignmentIcon color="primary" sx={{ verticalAlign: "middle", mr: 1 }} />
                                                    {course.teacher} опубликовал <b>{c.desc.slice(0, 50) + "..."}</b>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default CoursePage;