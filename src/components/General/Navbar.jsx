import React from 'react';
import Search from './Search';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../../Features/Wishlist/wishlistSlice';

const navigation = [
    { name: 'Home', link: '/', current: true },
    { name: 'Shirts', link: '/products', current: false },
    { name: 'Jeans', link: '/products', current: false },
    { name: 'T-shirt', link: '/products', current: false },
    { name: 'More', link: '/products', current: false },
]

const Navbar = () => {

    // select wishlist items from redux store to display the wishlist items count on Navbar
    const items = useSelector(selectItems);

    
    return (
        <nav className="flex items-center justify-between  py-2 lg:py-3  bg-black text-white sticky top-0 z-10">
            {/* Left Logo */}
            <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fmaharaj2.png?alt=media&token=fbee43dc-a6c0-4b8b-a418-50eb17d6c012" alt="Left Logo" className="h-16 lg:h-20 ml-2 lg:ml-8" />
            </div>

            {/* Navigational Links (Hidden in Mobile) */}
            <ul className="hidden md:flex md:gap-8 font-oswald text-lg">
                {
                    navigation.map((navlink, index) =>
                        <li key={index}>
                            <NavLink to={navlink.link} value={navlink.link} className="text-white hover:text-gray-400">{navlink.name}</NavLink>
                        </li>
                    )
                }

            </ul>

            {/* Center Logo */}
            <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Flogo.png?alt=media&token=03c7de96-e4c8-41db-859a-cc5022e4e88d" alt="Center Logo" className="w-28 lg:w-40 mx-4" />
            </div>

            {/* Navigational Links (Hidden in Mobile) */}
            <ul className="hidden md:flex md:gap-8 text-lg">

                <li className='mt-5 '>
                    <NavLink to="/wishlist" value="/wishlist" className="text-white hover:text-gray-400 flex relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <div className='badge'>{items.length}</div>
                        <span className='ml-1'>Cart</span>
                    </NavLink>
                </li>
                <li className='mt-5'>
                    <NavLink to="/track-order" value="/track-order" className="text-white hover:text-gray-400 flex relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-1 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className='ml-1'>Orders</span>
                    </NavLink>
                </li>
                <li>
                    {/* <NavLink to="/about" className="text-white hover:text-gray-400">Contact Us</NavLink>> */}
                    <Search />
                </li>
            </ul>

            {/* Right Logo */}
            <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Frajmudra.png?alt=media&token=fc145868-bc20-4562-b319-c0708118b5d7" alt="Right Logo" className="h-16 lg:h-20 mr-2 lg:mr-8" />
            </div>
        </nav>
    );
};

export default Navbar;
