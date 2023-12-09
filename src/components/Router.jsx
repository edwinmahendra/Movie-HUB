import { BrowserRouter , Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Blank from "../pages/Blank";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { Detail } from "../pages/Detail/Detail";
import Bookmark from "../pages/Bookmark/Bookmark";
import Profile from "../pages/Profile/Profile";
import EditPicture from "../pages/Profile/EditPicture";
import MovieList from "../pages/MovieList/MovieList";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/movies/:movieType" element={<MovieList />} />
                    <Route path="/bookmark" element={<Bookmark />} />
                    <Route path="/logout" element={<Blank />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/detail/:idMovie" element={<Detail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile-pic" element={<EditPicture />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;