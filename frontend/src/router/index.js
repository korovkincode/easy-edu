import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export const privateRoutes = [
    {path: "/courses", component: Courses},
    {path: "/profile/:username", component: Profile}
];

export const publicRoutes = [
    {path: "/signup", component: Register},
    {path: "/login", component: Login},
    {path: "/profile/:username", component: Profile}
];