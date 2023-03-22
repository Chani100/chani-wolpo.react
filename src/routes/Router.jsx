import { Navigate,Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ROUTES from "./ROUTES";


let Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
    </Routes>
  );
};
export default Router;
