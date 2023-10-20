import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const AppLayout = () => {
    return <div style={{
        paddingLeft: '16%',
        paddingRight: '1%',
        paddingTop: '1%',
        paddingBottom: '1%',
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;