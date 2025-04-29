import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../auth/pages/loginPage/LoginPage";
import { RegisterPage } from "../auth/pages/registerPage/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage></LoginPage>
    },
    {
        path: '/register',
        element: <RegisterPage></RegisterPage>
    }
])