import React from "react";
import { Container, Box, Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const TaskPage = () => {
    //Make API Request
    const task = {teacher: "Sam Sulek", name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"};

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
                        <AssignmentIcon />
                        <Typography variant="h4" sx={{ color: "#007B83" }}>
                            {task.name}
                        </Typography>
                        <Typography sx={{ mt: 1 }} color="text.disabled">
                            Sam Sulek • 1 окт.
                        </Typography>
                        <Typography fontWeight="fontWeightBold"
                        sx={{ alignSelf: "flex-end", mb: 2 }}>
                            Срок сдачи: 31 дек., 23:59
                        </Typography>
                        <Divider color="#007B83" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5">
                                    Мои задания
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default TaskPage;