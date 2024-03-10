import React from "react";
import CourseCard from "../components/CourseCard";
import { Grid, Box, Container, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context";
import { GetUserCourses } from "../utils/API";
import CircularProgress from "@mui/material/CircularProgress";

const Courses = () => {
    const [[userToken, setUserToken], [secretToken, setSecretToken]] = useContext(AuthContext);
    const [coursesAll, setCoursesAll] = useState([]);
    const [isLoading, setIsLoading] = useState(0);
    const [page, setPage] = useState(1);
    const [courses, setCourses] = useState([]);
    const LIMIT = 12;

    useEffect(() => {
        // Make API Request to get courses
        async function getCoursesData() {
            setIsLoading(1);
            setCoursesAll([]);
            setCoursesAll(await GetUserCourses(userToken));
            setIsLoading(0);
        }
        getCoursesData();
    }, [userToken]);

    const handleCourses = (c, limit, p) => {
        let newCourses = [];
        for (let i = limit * (p - 1); limit && i < c.length; i++) {
            limit--;
            newCourses.push(c[i]);
        }
        setCourses(newCourses);
    }
    useEffect(() => {
        handleCourses(coursesAll, LIMIT, page);
    }, [userToken, page, coursesAll]);

    return (
        <Container maxWidth="md">
            <Box sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center" }}>
                
                <Typography variant="h4" sx={{ alignSelf: "flex-start" }}>
                    Your courses
                </Typography>
                {isLoading === 1 &&
                    <CircularProgress />
                }
                <Grid sx={{ marginTop: 2 }} container spacing={2}>
                    {courses.map((c, index) =>
                        <Grid item xs={12} sm={4} key={index}>
                            <CourseCard card={c} key={index} />
                        </Grid>
                    )}
                </Grid>
                <Pagination
                    sx={{ marginTop: 5, marginBottom: 5 }}
                    count={Math.ceil(coursesAll.length / LIMIT)} value={page}
                    onChange={(_, p) => setPage(p)} 
                />
            </Box>
        </Container>
    )
}

export default Courses;