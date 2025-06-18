import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { ChevronLeft } from 'lucide-react';

const SideMenu = () => {
    const [sideMenuData, setSideMenuData] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showText, setShowText] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (route) => { navigate(route) };

    useEffect(() => {
        setSideMenuData(user ? (user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA) : []);
    }, [user]);

    useEffect(() => {
        if (!isCollapsed) {
            const timer = setTimeout(() => {
                setShowText(true);
            }, 250);
            return () => clearTimeout(timer);
        } else {
            setShowText(false);
        }
    }, [isCollapsed]);

    return (
        <>
            {/* Desktop Side Menu */}
            <div className={`hidden md:block h-[calc(100vh-49px)] bg-white border-r border-gray-200/50 sticky top-[49px] z-20 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[70px]' : 'w-45'}`}>
                {sideMenuData.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        onClick={() => handleClick(item.path)}
                        className={`w-full flex items-center gap-4 text-[12px]
                            ${location.pathname === item.path
                                ? 'text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3'
                                : ""
                            } py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out`
                        }
                    >
                        <item.icon className='text-base' />
                        {!isCollapsed && (
                            <span className={`transition-all duration-300 ease-in-out ${showText ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                {item.label}
                            </span>
                        )}
                    </button>
                ))}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden md:flex absolute -right-4 bottom-6 w-8 h-8 rounded-full bg-primary text-white items-center justify-center hover:bg-primary/90 transition-all duration-300 ease-in-out"
                >
                    <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200/50 z-50">
                <div className="flex justify-around items-center h-16 px-2">
                    {sideMenuData.map((item, index) => (
                        <button
                            key={`mobile_menu_${index}`}
                            onClick={() => handleClick(item.path)}
                            className={`flex flex-col items-center justify-center w-full h-full
                                ${location.pathname === item.path
                                    ? 'text-primary'
                                    : 'text-gray-600'
                                } transition-colors duration-200 ease-in-out`}
                        >
                            <item.icon className='text-base mb-1' />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideMenu;
