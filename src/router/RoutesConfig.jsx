import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../auth/pages/loginPage/LoginPage";
import BrowsePage from "../pages/browse/BrowsePage";
import RegisterPage from "../auth/pages/registerPage/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage></LoginPage>
    },
    {
        path: '/register',
        element: <RegisterPage></RegisterPage>
    },
    {
        path: '/browse',
        element: <BrowsePage></BrowsePage>
    }
])