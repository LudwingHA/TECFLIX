import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../auth/pages/loginPage/LoginPage";
import { RegisterPage } from "../auth/pages/registerPage/RegisterPage";
import BrowsePage from "../pages/browse/BrowsePage";

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