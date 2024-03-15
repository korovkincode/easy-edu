import React from "react";
import { Container, Box, Grid, Card, CardHeader, CardContent, Typography, Divider, Avatar, Button, TextField } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from '@mui/icons-material/Add';

const TaskPage = () => {
    //Make API Request
    const task = {
        teacher: "Sam Sulek",
        date: "Oct 1",
        deadline: "Dec 31",
        points: "100",
        name: "Lorem ipsum dolor sit amet",
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pellentesque turpis sit amet ligula congue, sed rutrum enim auctor.
            Cras imperdiet auctor dictum. Duis eget tincidunt ante. Integer tincidunt consectetur mollis.
            
            Fusce ligula felis, ullamcorper eget libero et, ultrices mattis enim. Vestibulum egestas sit amet sapien quis consectetur.
            Aenean ornare pulvinar convallis. Maecenas vitae felis vel eros laoreet feugiat vestibulum et nisl.
            
            Quisque feugiat facilisis accumsan. Sed pulvinar nisi eget sapien ultricies, quis ultrices arcu euismod.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        `
    };

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
                            title={<Typography variant="h4" sx={{ ml: 0.5 }}>{task.name}</Typography>}
                            avatar={
                                <Avatar sx={{ width: "42px", height: "42px", bgcolor: "#1976D2" }}>
                                    <AssignmentIcon />
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Typography sx={{ mt: -3.5, ml: 5, mb: 1 }} color="text.secondary">
                                {task.teacher} • {task.date}
                            </Typography>
                            <Grid container xs={12} justifyContent="space-between">
                                <Typography inline sx={{ fontWeight: 550, ml: 5 }} color="#3c4043">
                                    {task.points} points
                                </Typography>
                                <Typography inline align="right" fontWeight="fontWeightBold">Deadline: {task.deadline}</Typography>
                            </Grid>
                            <Divider sx={{ mt: 3, ml: 5 }} color="#007B83" />
                            <Typography 
                                sx={{ ml: 5 }}
                                dangerouslySetInnerHTML={{ __html: task.desc.replace(/\n/g, "<br />") }}
                            />
                            <Divider sx={{ mt: 3, ml: 5 }} color="#E8EAED" />
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container xs={12} justifyContent="space-between">
                                    <Typography inline sx={{ fontSize: 27 }}>
                                        My Tasks
                                    </Typography>
                                    <Typography inline align="right" sx={{ mt: 1, fontWeight: 500, fontSize: 18 }} color="success.main">
                                        Assigned
                                    </Typography>
                                </Grid>
                                <Grid container xs={12} justifyContent="center" sx={{ mt: 2 }}>
                                    <Button sx={{ border: "1px solid #1976D2" }} component="label" startIcon={<AddIcon />} fullWidth>
                                        Add or create
                                    </Button>
                                    <Button sx={{ mt: 3 }} variant="contained" component="label" fullWidth>
                                        Mark as completed
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