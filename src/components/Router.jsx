import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { Detail } from "../pages/Detail/Detail";
import Bookmark from "../pages/Bookmark/Bookmark";
import Profile from "../pages/Profile/Profile";
import EditPicture from "../pages/Profile/EditPicture";
import MovieList from "../pages/MovieList/MovieList";
import useAuth from "../setup/Auth";
import SearchResult from "./Search/SearchResults";
import NotFound404 from "../pages/404";

const Router = () => {
    const { currentUser, justRegistered, resetJustRegistered } = useAuth();

    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/movies/search" element={<SearchResult />} />
              <Route path="/movies/:movieType" element={<MovieList />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="*" element={<NotFound404 />} />
            </Route>
            <Route
              path="/login"
              element={
                !currentUser ? <Login /> : (justRegistered ? <Navigate to="/login" replace onNavigate={resetJustRegistered} /> : <Navigate to="/home" />)
              }
            />
            <Route
              path="/register"
              element={!currentUser ? <Register /> : <Navigate to="/login" />}
            />
            <Route path="/detail/:idMovie" element={<Detail />} />
            <Route
              path="/profile"
              element={currentUser ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/edit-profile-pic" element={<EditPicture />} />
          </Routes>
        </BrowserRouter>
      );
};

export default Router;