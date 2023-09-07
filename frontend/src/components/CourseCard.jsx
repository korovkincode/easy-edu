import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link as LinkDOM } from "react-router-dom";
import React from "react";

const CourseCard = ({card}) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.disabled" gutterBottom>
                    {card.teacher}
                </Typography>
                <Typography color="text.primary" variant="h5">
                    {card.name}
                </Typography>
                <Typography color="text.secondary" variant="h7">
                    {card.desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small"><LinkDOM to={`/course/${card.id}`}>Learn More</LinkDOM></Button>
            </CardActions>
        </Card>
    )
} 

export default CourseCard;