import React, { useState } from 'react'
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import SideMenu from './SideMenu';
import mainLogo from '../../assets/brandName.png'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 sticky top-0 z-30'>
            <button className='block lg:hidden text-black' onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu
                    ? <HiOutlineX className="text-2xl" />
                    : <HiOutlineMenu className="text-2xl" />
                }
            </button>
            <img src={mainLogo} alt='Brand logo' className='h-10 ml-5 cursor-pointer' onClick={() => navigate('/admin/dashboard')} />
            {openSideMenu &&
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            }
        </div>
    )
}

export default Navbar