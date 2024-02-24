import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Card, CardContent, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link as LinkDOM } from "react-router-dom";
import { getTodayDate } from "../utils/date";

const CoursePage = () => {
    const params = useParams();
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);

    const course = {id: params.cid, name: "11A: PE", teacher: "Sam Sulek", desc: "Daily 3PM"}; //Make API Request
    const content = [
        {ttype: "Announcement", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {ttype: "Task", id: 1, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {ttype: "Announcement", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {ttype: "Announcement", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2024"},
        {ttype: "Task", id: 2, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Feb 24 2023"}
    ];

    const addComment = () => {
        setAllComments([...allComments, {name: localStorage.getItem("username"), comm: comment, date: getTodayDate()}]);
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
                            {allComments.length > 0 &&
                                <Typography sx={{ mt: 2, ml: 2 }} variant="h5" color="text.secondary">
                                    Комментарии
                                </Typography>
                            }
                            <Grid item xs={12}>
                                {allComments.map(c => 
                                    <Card sx={{ mb: 1.5, border: "1px solid #A8A8A8" }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 15 }}>
                                                <AccountCircle sx={{ verticalAlign: "middle", mr: 1 }} />
                                                {c.name}
                                            </Typography>
                                            <Typography sx={{ mt: -0.5, ml: 4, fontSize: 14 }} color="text.disabled" gutterBottom>
                                                {
                                                    c.date.split(" ")[2] == new Date().getFullYear()
                                                    ? c.date.replace(new Date().getFullYear().toString(), "")
                                                    : c.date
                                                }
                                            </Typography>
                                            <Typography color="text.primary">
                                                {c.comm}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )}
                            </Grid>
                            <Typography sx={{ mt: 2.5, ml: 2 }} variant="h5" color="text.secondary">
                                Материалы
                            </Typography>
                            {content.length > 0
                                ?
                                <Grid item xs={12}>
                                    {content.map(c =>
                                        c.ttype === "Announcement"
                                        ?
                                            <Card sx={{ mb: 1.5, border: "1px solid #A8A8A8" }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 15 }}>
                                                        <AccountCircle sx={{ verticalAlign: "middle", mr: 1 }} />
                                                        {course.teacher}
                                                    </Typography>
                                                    <Typography sx={{ mt: -0.5, ml: 4, fontSize: 14 }} color="text.disabled" gutterBottom>
                                                    {
                                                        c.date.split(" ")[2] == new Date().getFullYear()
                                                        ? c.date.replace(new Date().getFullYear().toString(), "")
                                                        : c.date
                                                    }
                                                    </Typography>
                                                    <Typography sx={{ mt: 1 }} color="text.primary">
                                                        {c.desc}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        :
                                            <Card className="course__task" sx={{ mb: 1.5, border: "1px solid #A8A8A8" }}>
                                                <CardContent>
                                                    <LinkDOM to={`/course/${params.cid}/task/${c.id}`}>
                                                        <Typography color="text.primary">
                                                            <AssignmentIcon color="primary" sx={{ verticalAlign: "middle", mr: 1 }} />
                                                            {course.teacher} опубликовал <b>{c.desc.slice(0, 50) + "..."}</b>
                                                        </Typography>
                                                        <Typography sx={{ mt: -0.5, ml: 4, fontSize: 14 }} color="text.disabled">
                                                            {c.date}
                                                        </Typography>
                                                    </LinkDOM>
                                                </CardContent>
                                            </Card>
                                    )}
                                </Grid>
                                :
                                <Typography sx={{ mt: 2, ml: 2 }} variant="h5">
                                    Тут пока пусто
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