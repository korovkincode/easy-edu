import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const privateRoutes = [
    {path: "/courses", component: Courses},
];

export const publicRoutes = [
    {path: "/signup", component: Register},
    {path: "/login", component: Login}
];