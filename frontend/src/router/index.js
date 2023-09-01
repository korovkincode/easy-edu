import Courses from "../pages/Courses";
import Register from "../pages/Register";

export const privateRoutes = [
    {path: "/courses", component: Courses},
];

export const publicRoutes = [
    {path: "/signup", component: Register},
];