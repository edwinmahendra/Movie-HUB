import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaAngleRight, FaBookmark,  } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IoMdLogOut } from 'react-icons/io';
import logo from "../../assets/logo.svg";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
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

const ProfileSidebar = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const db = getFirestore();
    const [userInfo, setUserInfo] = useState({ name: '', email: '', photoUrl: '', isLoading: true });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userDocRef = doc(db, "Users", user.uid);
                getDoc(userDocRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        setUserInfo({
                            name: docSnap.data().name || user.displayName || 'No Name',
                            email: user.email,
                            photoUrl: docSnap.data().profilePicture || user.photoURL || "https://via.placeholder.com/50x50",
                            isLoading: false
                        });
                    }
                }).catch(error => {
                    console.error("Error fetching user data:", error);
                    setUserInfo(prev => ({ ...prev, isLoading: false }));
                });
            } else {
                setUserInfo(prev => ({ ...prev, isLoading: false }));
            }
        });

        // Clean up the listener
        return () => unsubscribe();
    }, [auth, db]);

    const handleClick = () => {
        navigate("/profile");
    };

    if (userInfo.isLoading) {
        return (
            <div className="profile_sidebar">
                <div className='img-placeholder shimmer' style={{ height: '50px', width: '50px', borderRadius: '50%' }}></div>
                <div className='detail_profile'>
                    <div className='text-placeholder shimmer' style={{ width: '100px', height: '10px', margin: '5px 0' }}></div>
                    <div className='text-placeholder shimmer' style={{ width: '150px', height: '10px', margin: '5px 0' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile_sidebar">
            <img className='img_profile' src={userInfo.photoUrl} style={{ cursor: 'pointer' }} onClick={handleClick} />
            <div className='detail_profile'>
                <span style={{ cursor: 'pointer' }} onClick={handleClick}>{userInfo.name}</span>
                <span>{userInfo.email}</span>
            </div>
        </div>
    );
}
export default Sidebar;