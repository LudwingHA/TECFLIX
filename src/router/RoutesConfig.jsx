import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "../auth/pages/loginPage/LoginPage";
import BrowsePage from "../pages/browse/BrowsePage";
import RegisterPage from "../auth/pages/registerPage/RegisterPage";
import ProfilesPage from "../auth/pages/profiles/ProfilesPage";
import { ProfileProtectedRoute } from "./ProfileProtectedRoute";
import { ProtectedRoute } from "./ProtectedRoutes";
import CreateProfilePage from "../auth/pages/profiles/CreateProfilePage";
import LandingPage from "../auth/pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>
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
    element: <ProtectedRoute><Outlet /></ProtectedRoute>, // Usa Outlet aquí
    children: [
      {
        index: true,
        element: <ProfilesPage />
      },
      {
        path: "create",
        element: <CreateProfilePage />
      }
    ]
  },
  {
    path: "/browse",
    element: <ProfileProtectedRoute><BrowsePage /></ProfileProtectedRoute>
  },
  {
    path: "*",
    element: <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl">404 - Página no encontrada</h1>
    </div>
  }
]
);