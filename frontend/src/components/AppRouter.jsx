import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import { useContext } from "react";
import { AuthContext } from "../context";

const AppRouter = () => {
    const [[userToken, setUserToken], [secretToken, setSecretToken]] = useContext(AuthContext);

    return (
        <Routes>
            {userToken !== ""
                ? privateRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={<route.component />} />   
                )
                : publicRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={<route.component />} />    
                )
            }
            {userToken !== ""
                ? <>
                    <Route path="/signup" element={<Navigate to="/courses" replace />} />
                    <Route path="/login" element={<Navigate to="/courses" replace />} />
                    <Route path="/" element={<Navigate to="/courses" replace />} />
                  </>
                : <>
                    {privateRoutes.map(route => 
                        <Route key={route.path} path={route.path} element={<Navigate to="/signup" replace />} />    
                    )}
                    <Route path="/" element={<Navigate to="/signup" replace />} />
                  </>
            }
        </Routes>
    )
}

export default AppRouter;