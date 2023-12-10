import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaAngleRight, FaBookmark,  } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IoMdLogOut } from 'react-icons/io';
import logo from "../../assets/logo.svg";
import "./sidebar.css";
import ConfirmLogoutModal from '../Logout/ConfirmLogoutModal';

const sidebarItems = [
    {
        display: "Home", 
        icon: <FaHome />,
        to: "/",
        section: ""
    },
    {
        display: "Bookmark",
        icon: <FaBookmark />,
        to: "/bookmark",
        section: "bookmark"
    },
    // {
    //     display: "Logout", 
    //     icon: <LuLogOut />,
    //     action: () => setShowLogoutModal(true),
    //     section: "logout"
    // },
];



const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal visibility
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar_menu_item');
            if (sidebarItem) {
                indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
                setStepHeight(sidebarItem.clientHeight);
            }
        }, 50);
    }, []);

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 || activeItem === -1 ? 0 : activeItem);
    }, [navigate]);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleCloseLogoutModal = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className='sidebar'>
            <div className="sidebar_logo">
                <img src={logo} alt="logo" style={{ height: '100px', width: '120px' }} />
            </div>
            <div ref={sidebarRef} className="sidebar_menu">
                <p className='sidebar_title_menu'>MENU</p>
                <div
                    ref={indicatorRef}
                    className="sidebar_menu_indicator"
                    style={{
                        transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                    }}
                ></div>
                {
                    sidebarItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sidebar_menu_item ${activeIndex === index ? 'active' : ''}`}>
                                <div className="sidebar_menu_item_icon">
                                    {item.icon}
                                </div>
                                <div className="sidebar_menu_item_text">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))
                }
                <div onClick={handleLogoutClick} className={`sidebar_menu_item ${activeIndex === 2 ? 'active' : ''}`}>
                    <div className="sidebar_menu_item_icon">
                        <LuLogOut />
                    </div>
                    <div className="sidebar_menu_item_text">
                        Logout
                    </div>
                </div>
            </div>
            <ProfileSidebar />
            <ConfirmLogoutModal show={showLogoutModal} handleClose={handleCloseLogoutModal} />
        </div>
    );
}

const ProfileSidebar = ({photoUrl, name, email}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/profile");
    };

    return (
        <div className="profile_sidebar">
            <img className='img_profile' src="https://via.placeholder.com/50x50" style={{cursor: 'pointer'}} onClick={handleClick}/>
            <div className='detail_profile'>
                <span style={{cursor: 'pointer'}} onClick={handleClick}>Johny Andrean</span>
                <span>markjhony@gmail.com</span>
            </div>
        </div>
    );
}

export default Sidebar;