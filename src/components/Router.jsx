import { BrowserRouter , Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Blank from "../pages/Blank";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import EditPicture from "../pages/Profile/EditPicture";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/bookmark" element={<Blank />} />
                    <Route path="/logout" element={<Blank />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile-pic" element={<EditPicture />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;