import React from "react";
import { Container, Box, Grid, Card, CardHeader, CardContent, Typography, Divider, Avatar, Button } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from '@mui/icons-material/Add';

const TaskPage = () => {
    //Make API Request
    const task = {teacher: "Sam Sulek", name: "Lorem ipsum dolor sit amet"};

    return (
        <Container maxWidth="lg">
			<Box sx={{		
                display: "flex",
				flexDirection: "column",
				alignItems: "center"
            }}>
                <Grid sx={{ mt: 1 }} container spacing={2}>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} 
                    item spacing={2} xs={12} sm={8}>
                        <CardHeader sx={{ ml: -3 }}
                            title={<Typography variant="h4" sx={{  }}>{task.name}</Typography>}
                            avatar={
                                <Avatar sx={{ width: "42px", height: "42px", bgcolor: "#1976D2" }}>
                                    <AssignmentIcon />
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Typography sx={{ mt: -3.5, ml: 4.5, mb: 1 }} color="text.secondary">
                                Sam Sulek • Oct 1
                            </Typography>
                            <Grid container xs={12} justifyContent="space-between">
                                <Typography inline sx={{ fontWeight: 550, ml: 4.5 }} color="#3c4043">
                                    100 points
                                </Typography>
                                <Typography inline align="right" fontWeight="fontWeightBold">Срок сдачи: 31 дек., 23:59</Typography>
                            </Grid>
                            <Divider sx={{ mt: 3, ml: 5 }} color="#007B83" />
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container xs={12} justifyContent="space-between">
                                    <Typography inline variant="h5">
                                        Мои задания
                                    </Typography>
                                    <Typography inline align="right" sx={{ mt: 0.5, fontWeight: 550, fontSize: 17 }} color="success.main">
                                        Назначено
                                    </Typography>
                                </Grid>
                                <Grid container xs={12} justifyContent="center" sx={{ mt: 2 }}>
                                    <Button sx={{ border: "1px solid #1976D2" }} component="label" startIcon={<AddIcon />}>
                                        Добавить или создать
                                    </Button>
                                    <Button sx={{ mt: 2 }} variant="contained" component="label">
                                        Отметить как выполненное
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default TaskPage;