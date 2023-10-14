import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const AppLayout = () => {
    return <div style={{
        paddingLeft: '15%',
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;