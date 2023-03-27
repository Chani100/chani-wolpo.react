import { Link, Navigate,Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import EditCardPage from "../pages/EditCardPage";
import ROUTES from "./ROUTES";
import { Typography } from "@mui/material";


let Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path="/edit/:id" element={<EditCardPage />} />
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
