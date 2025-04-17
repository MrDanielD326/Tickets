import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);
    return (
        <div className=''>
            <Navbar activeMenu={activeMenu} />
            {/** @todo : Reverse this user initilaization to user -> !user and vice versa */}
            {!user && (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className='grow mx-5'> {children} </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout