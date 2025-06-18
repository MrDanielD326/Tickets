import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div className=''>
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className='grow mx-5'>
                        {children}
                        <footer className='py-4'>
                            <div className='container mx-auto px-4'>
                                <p className='text-center text-gray-700'>
                                    © {new Date().getFullYear()} Tickets. All rights reserved.
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout