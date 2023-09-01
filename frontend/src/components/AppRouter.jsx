import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import { useContext } from "react";
import { AuthContext } from "../context";

const AppRouter = () => {
    const {username, setUsername} = useContext(AuthContext);
    console.log(username);

    return (
        <Routes>
            {username !== ""
                ? privateRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={<route.component />} />    
                )
                : publicRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={<route.component />} />    
                )
            }
            {username !== ""
                ? <Route path="/signup" element={<Navigate to="/courses" replace />} />
                : <Route path="/courses" element={<Navigate to="/signup" replace />} />
            }
        </Routes>
    )
}

export default AppRouter;