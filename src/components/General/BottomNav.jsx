import { HomeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const commonClasses = "text-sm text-gray-600 dark:text-gray-400";

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium ">
                <button
                    type="button"
                    to="/"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group tahir"
                    onClick={() => navigate('/')}
                >

                    <HomeIcon strokeWidth={1.5} stroke={location.pathname === '/' ? "#ff8000" : "currentColor"} className="w-6 h-6 mb-1 text-gray-600 dark:text-gray-400" />

                    <span className={location.pathname === '/' ? `${commonClasses} tahir` : `${commonClasses}`}>Home</span>
                </button>

                <button type="button"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    onClick={() => navigate('/products')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={location.pathname === '/products' ? "#ff8000" : "currentColor"} className="w-6 h-6 mb-1 text-gray-600 dark:text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <NavLink to="/products" value="/products" className={location.pathname === '/products' ? `${commonClasses} tahir` : `${commonClasses}`}>Products</NavLink>
                </button>
                <button type="button"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    onClick={() => navigate('/track-order')}
                >
                    <MapPinIcon strokeWidth={1.5} stroke={location.pathname === '/track-order' ? "#ff8000" : "currentColor"} className="w-6 h-6 mb-1 text-gray-600" />
                    <span to="/track-order" value="/track-order" className={location.pathname === '/track-order' ? `${commonClasses} tahir` : `${commonClasses}`}>Orders</span>
                </button>

            </div>
        </div>


    )
}

export default BottomNav