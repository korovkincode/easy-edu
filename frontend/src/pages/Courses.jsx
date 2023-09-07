import React from "react";
import CourseCard from "../components/CourseCard";
import { Grid, Box, Container, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { useEffect } from "react";

const Courses = () => {
    // Make API Request to Get Courses
    const coursesOriginal = [
        {id: 1, name: "PE", teacher: "Sam Sulek", desc: "Daily: 3PM"},
        {id: 2, name: "Physics", teacher: "Albert Einstein", desc: "Daily: 1PM"},
        {id: 3, name: "Maths", teacher: "Euclid", desc: "Daily: 10AM"}
    ];
    const [page, setPage] = useState(1);
    const [courses, setCourses] = useState([]);
    const LIMIT = 12;

    //Fake data to check pagination
    let coursesAll = [];
    for (let i = 0; i < 54; i++) {
        coursesAll.push({...coursesOriginal[i % 3], id: i + 1});
    }

    const handleCourses = (c, limit, p) => {
        let newCourses = [];
        for (let i = limit * (p - 1); (limit && i < coursesAll.length); i++) {
            limit--;
            newCourses.push(coursesAll[i]);
        }
        setCourses(newCourses);
    }
    useEffect(() => {
        handleCourses(coursesAll, LIMIT, page);
    }, [page]);

    return (
        <Container maxWidth="md">
            <Box sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center" }}>
                
                <Typography variant="h4" sx={{ alignSelf: "flex-start" }}>Твои курсы</Typography>
                <Grid sx={{ marginTop: 2 }} container spacing={2}>
                    {courses.map((c, index) =>
                        <Grid item xs={12} sm={4} key={index}>
                            <CourseCard card={c} key={index} />
                        </Grid>
                    )}
                </Grid>
                <Pagination sx={{ marginTop: 5, marginBottom: 5 }} count={Math.ceil(coursesAll.length / LIMIT)} value={page} onChange={(_, p) => setPage(p)} />
            </Box>
        </Container>
    )
}

export default Courses;