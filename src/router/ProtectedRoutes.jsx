import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ()=> {
    const [isAunthenticated, setisAunthenticated] = useState(false)
    return isAunthenticated ? <Outlet></Outlet> : <Navigate to={'/login'}></Navigate>
}
export default ProtectedRoutes