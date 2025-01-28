import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../../Features/Wishlist/wishlistSlice';
import { MapPinIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', link: '/', current: true },
    { name: 'Shirts', link: '/products', current: false },
    { name: 'Jeans', link: '/products', current: false },
    { name: 'T-shirt', link: '/products', current: false },
    { name: 'Explore', link: '/products', current: false },
]

const Navbar = () => {
    // select wishlist items from redux store to display the wishlist items count on Navbar
    const items = useSelector(selectItems);
    return (
        <nav className="flex items-center justify-between  py-1.5 px-0 md:px-14 bg-black text-white sticky top-0 z-10">
            {/* Navigational Links (Hidden in Mobile) */}
            <ul className="hidden md:flex md:gap-x-8">
                {
                    navigation.map((navlink, index) =>
                        <li key={index}>
                            <NavLink to={navlink.link} value={navlink.link} className="text-white hover:text-gray-400">{navlink.name}</NavLink>
                        </li>
                    )
                }

            </ul>
            <ul className='flex gap-x-1'>
                {/* mmaharaj Logo */}
                <li>
                    <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fmaharaj2.png?alt=media&token=fbee43dc-a6c0-4b8b-a418-50eb17d6c012" alt="Left Logo" className="h-14 ml-2 lg:ml-8" />
                </li>
                {/* shop Logo */}
                <li>
                    <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Flogo.png?alt=media&token=03c7de96-e4c8-41db-859a-cc5022e4e88d" alt="Center Logo" className="w-28 lg:w-28 mx-4" />
                </li>
            </ul>
            {/* Navigational Links (Hidden in Mobile) */}
            <ul className="hidden md:flex md:gap-x-8">
                <li>
                    <NavLink to="/about" className="text-white hover:text-gray-400">Contact</NavLink>
                    {/* <Search /> */}
                </li>
                <li>
                    <NavLink to="/about" className="text-white hover:text-gray-400">About</NavLink>
                    {/* <Search /> */}
                </li>
                <li>
                    <NavLink to="/wishlist" value="/wishlist" className="text-white hover:text-gray-400 flex relative">
                        <div className='badge'>{items.length}</div>
                        <span className='mr-1'>Cart</span>
                        <ShoppingBagIcon width={20} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/track-order" value="/track-order" className="text-white hover:text-gray-400 flex relative">
                        <span className='mr-1'>Track Order</span>
                        <MapPinIcon width={20} />
                    </NavLink>
                </li>
            </ul>

            {/* Right Logo */}
            {/* <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Frajmudra.png?alt=media&token=fc145868-bc20-4562-b319-c0708118b5d7" alt="Right Logo" className="h-16 lg:h-20 mr-2 lg:mr-8" />
            </div> */}
        </nav>
    );
};

export default Navbar;
