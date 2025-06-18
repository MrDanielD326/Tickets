import React, { useState, useContext } from 'react'
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import SideMenu from './SideMenu';
import mainLogo from '../../assets/brandName.png'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showUserPopover, setShowUserPopover] = useState(false);
    const navigate = useNavigate();
    const { user, clearUser } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    const brandLogo = () => (<img src={mainLogo} alt='Brand logo' className='h-8 ml-5 cursor-pointer' onClick={() => navigate('/admin/dashboard')} />);

    const menuBar = () => (
        <button className='block lg:hidden text-black p-2' onClick={() => setOpenSideMenu(!openSideMenu)}>
            {openSideMenu ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
        </button>
    );

    const userData = () => {
        return (
            <div className='relative'>
                <div className='flex items-center gap-3 mr-8 cursor-pointer' onClick={() => setShowUserPopover(!showUserPopover)}>
                    <span className='text-gray-850 text-xs'> Welcome, {user?.name?.split(' ')[0] || ""} </span>
                    <img className='w-8 h-8 bg-slate-400 rounded-full' src={user?.profileImageUrl || 'Unavailable'} alt='Profile Pic' />
                </div>
                {showUserPopover && (
                    <div className='absolute right-8 top-12 bg-white shadow-lg rounded-lg p-4 min-w-[320px] max-w-[420px] w-auto border border-gray-200'>
                        <button
                            className='absolute top-2 right-2 text-gray-400 hover:text-gray-700 focus:outline-none cursor-pointer'
                            onClick={() => setShowUserPopover(false)}
                        >
                            <HiOutlineX className='w-5 h-5' />
                        </button>
                        <div className='flex flex-col gap-2 pt-6'>
                            <div className='flex items-center gap-4'>
                                <img
                                    className='w-16 h-16 bg-slate-400 rounded-full'
                                    src={user?.profileImageUrl || 'Unavailable'}
                                    alt='Profile Pic'
                                />
                                <div className='flex flex-col flex-1'>
                                    <div className='flex items-center justify-between w-full'>
                                        <span className='text-gray-950 font-medium text-lg break-words'>{user?.name || ""}</span>
                                        {user?.role && (
                                            <span className='text-xs font-medium text-white bg-primary px-2 py-0.5 rounded ml-2'>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</span>
                                        )}
                                    </div>
                                    <span className='text-sm text-gray-500 whitespace-nowrap overflow-x-auto w-full block mt-1'>{user?.email || ""}</span>
                                </div>
                            </div>
                            <div className='border-t border-gray-200 mt-4 pt-4'>
                                <button
                                    onClick={handleLogout}
                                    className='w-full text-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors border border-red-200'
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2 sticky top-0 z-30 items-center justify-between'>
            <div className='flex items-center gap-5'>
                {brandLogo()}
            </div>
            {userData()}
            {openSideMenu && <div className='fixed top-[61px] -ml-4 bg-white'> <SideMenu activeMenu={activeMenu} /> </div>}
            {menuBar()}
        </div>
    )
}

export default Navbar