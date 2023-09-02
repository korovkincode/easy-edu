import React from "react";
import CourseCard from "../components/CourseCard";
import { Grid } from "@mui/material";

const Courses = () => {
    // Make API Request to Get Courses
    const courses = [
        {id: 1, name: "PE", teacher: "Sam Sulek", desc: "Daily: 3PM"},
        {id: 2, name: "Physics", teacher: "Albert Einstein", desc: "Daily: 1PM"},
        {id: 3, name: "Maths", teacher: "Euclid", desc: "Daily: 10AM"}
    ];
    
    return (
        <div className="courses__container">
            <h2>Твои курсы</h2>
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