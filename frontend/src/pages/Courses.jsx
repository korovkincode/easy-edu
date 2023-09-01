import React from "react";
import CourseCard from "../components/CourseCard";
import { Grid } from "@mui/material";

const Courses = () => {
    // Make API Request to Get Courses
    const courses = [
        {id: 1, name: "PE", teacher: "Sam Sulek"},
        {id: 2, name: "Physics", teacher: "Albert Einstein"},
        {id: 3, name: "Maths", teacher: "Euclid"}
    ];
    
    return (
        <div className="courses__container">
            <h2>Your courses</h2>
            <Grid style={{marginTop: 10}} container spacing={2}>
                {courses.map((c, index) =>
                    <Grid item md={4}>
                        <CourseCard card={c} key={index} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Courses;