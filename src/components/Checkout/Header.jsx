import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'

const Header = () => {
    return (
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <Link to="/" className="text-2xl font-bold text-gray-800">
                <img src={Logo} alt="Center Logo" className="w-28 lg:w-40" />
            </Link>
            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                <div className="relative">
                    <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" to="#"
                            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                                ></Link>
                            <span className="font-semibold text-gray-900">Shop</span>
                        </li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white ring ring-orange-600 ring-offset-2" to="#">2</Link>
                            <span className="font-semibold text-gray-900">Shipping</span>
                        </li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" to="#">3</Link>
                            <span className="font-semibold text-gray-500">Payment</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header