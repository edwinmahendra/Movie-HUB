import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import PropagateLoader from "react-spinners/PropagateLoader";
import Blank from "../pages/Blank";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { Detail } from "../pages/Detail/Detail";
import Bookmark from "../pages/Bookmark/Bookmark";
import Profile from "../pages/Profile/Profile";
import EditPicture from "../pages/Profile/EditPicture";
import MovieList from "../pages/MovieList/MovieList";
import ConfirmLogoutModal from "./Logout/ConfirmLogoutModal";
import useAuth from "../setup/Auth";
import SearchResult from "./Search/SearchResults";

const Router = () => {
    const { currentUser, isLoading, justRegistered } = useAuth();

    if (isLoading) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <PropagateLoader size={30} color="#6680C0" />
          </div>
        );
      }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies/search" element={<SearchResult />} />
          <Route path="/movies/:movieType" element={<MovieList />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Route>
        <Route
          path="/login"
          element={!currentUser && !justRegistered ? <Login /> : <Navigate to={justRegistered ? "/login" : "/profile"} />}
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