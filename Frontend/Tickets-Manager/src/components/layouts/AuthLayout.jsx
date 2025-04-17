import React from 'react'
import background from '../../assets/background.png'
import mainLogo from '../../assets/brandName.png'

const AuthLayout = ({ children }) => (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <img src={mainLogo} alt='Brand logo' className='h-10' />
            {children}
        </div>
        <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8" style={{ backgroundImage: `url(${background})` }} />
    </div>
)

export default AuthLayout
