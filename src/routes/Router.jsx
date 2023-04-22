import { Link, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import EditCardPage from "../pages/EditCardPage";
import ROUTES from "./ROUTES";
import { Typography } from "@mui/material";
import MyCards from "../pages/Mycards";
import LogoutPags from "../pages/LogoutPags";
import Sandbox from "../pages/Sandbox";
import CreateCard from "../pages/CreateCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import SuperProtectedRoute from "../components/SoperProtectedRoute";
import FavCards from "../pages/FavCards"

let Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />

      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPags />} />}
      />
      <Route path={ROUTES.MYCARDS} element={<MyCards />} />
      <Route path={ROUTES.SANDBOX} element={<Sandbox />} />
      <Route path={ROUTES.CREATE} element={<CreateCard />} />
      <Route path={ROUTES.FAVCARDS} element={<FavCards />} />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path="/createcard"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCard />}
          />
        }
      />
      <Route
        path="*"
        element={
          <Link to={ROUTES.HOME}>
            <Typography>
              The page does not exist. Return to home page.
            </Typography>
          </Link>
        }
      />
    </Routes>
  );
};
export default Router;
