import { Route, Routes } from "react-router-dom";
import DoTaskLandingPage from "./LAnding";
import { AuthLayout } from "../Registration/authLayout";
import DoRegistration from "../Registration/Register";
import DoLogin from "../Registration/Login";
import { Home } from "../homePage/home";

export function IndexPage() {
    return (
        <Routes>
            <Route path="/" element={<DoTaskLandingPage />} />
            <Route element={<AuthLayout />} > 
                <Route path="register" element={<DoRegistration/>} />
                <Route path="login" element={<DoLogin/>} />
            </Route>
            <Route path="/home"  element={<Home/>} />
        </Routes>
    );
}