import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import CoursePage from "../pages/CoursePage";
import TaskPage from "../pages/TaskPage";

export const privateRoutes = [
    {path: "/courses", component: Courses},
    {path: "/profile/:username", component: Profile},
    {path: "/course/:cid", component: CoursePage},
    {path: "/course/:cid/task/:tid", component: TaskPage}
];

export const publicRoutes = [
    {path: "/signup", component: Register},
    {path: "/login", component: Login},
    {path: "/profile/:username", component: Profile}
];