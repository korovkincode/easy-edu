import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Card, CardContent, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from '@mui/icons-material/Send';

const CoursePage = () => {
    const params = useParams();

    //Make API Request
    const course = {id: params.id, name: "11A: PE", teacher: "Sam Sulek", desc: "Daily 3PM"};
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
                                <Typography sx={{ mt: 2}} color="text.primary">
                                    Нет текущих объявлений
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Card variant="outlined">
                            <TextField fullWidth placeholder="Оставьте комментарий" 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color="secondary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton color="primary">
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default CoursePage;