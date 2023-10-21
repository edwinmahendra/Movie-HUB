import { BrowserRouter , Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Blank from "../pages/Blank";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Bookmark from "../pages/Bookmark/Bookmark";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                <Route index element={<Blank />} />
                <Route path="/home" element={<Blank />} />
                <Route path="/bookmark" element={<Bookmark />} />
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/bookmark" element={<Blank />} />
                <Route path="/logout" element={<Blank />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;