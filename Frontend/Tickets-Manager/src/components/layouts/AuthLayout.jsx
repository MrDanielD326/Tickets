import React from 'react'
import background from '../../assets/background.png'
import mainLogo from '../../assets/brandName.png'

const AuthLayout = ({ children }) => (
    <div className='flex relative min-h-screen'>
        <div className="absolute inset-0 md:hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${background})` }} />
        <div className='relative w-full md:w-[60vw] px-12 pt-8 pb-12 backdrop-blur-md bg-white/30 shadow-lg flex flex-col items-center justify-center min-h-screen md:min-h-0'>
            <img src={mainLogo} alt='Brand logo' className='h-10 mb-0 fixed top-[10px] left-[10px]' />
            <div className='w-full max-w-3xl mt-8'> {children} </div>
        </div>
        <div className="hidden md:block w-[40vw] h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${background})` }} />
    </div>
)

export default AuthLayout
