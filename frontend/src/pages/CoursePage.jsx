import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Card, CardContent, Grid } from "@mui/material";

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
            </Box>
        </Container>
    )
}

export default CoursePage;