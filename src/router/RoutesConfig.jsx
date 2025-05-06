import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../auth/pages/loginPage/LoginPage";
import BrowsePage from "../pages/browse/BrowsePage";
import RegisterPage from "../auth/pages/registerPage/RegisterPage";
import ProfilesPage from "../auth/pages/profiles/ProfilesPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProfilesPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/profiles",
        element: <ProfilesPage />
    },
    {
        path: "/browse",
        element: <BrowsePage></BrowsePage>
    }
]);
