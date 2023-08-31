import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const CourseCard = ({card}) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {card.teacher}
                </Typography>
                <Typography color="text.primary" variant="h5">
                    {card.name}
                </Typography>
            </CardContent>
        </Card>
    )
} 

export default CourseCard;