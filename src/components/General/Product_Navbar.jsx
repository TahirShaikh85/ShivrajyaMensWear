import Logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import Filter from '../Product/Filter'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectItems } from '../../Features/Wishlist/wishlistSlice';

const Product_Navbar = () => {
    const navigate = useNavigate();

     // select wishlist items from redux store to display the wishlist items count on Navbar
    const items = useSelector(selectItems);

    return (
        <nav className="flex items-center justify-between py-2 lg:py-3  bg-black text-white sticky top-0 z-10">

            <div className='flex items-center'>
                {/* go back */}
                <div to="/" className="ml-3 mr-3" onClick={()=>navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </div>

                {/* Center Logo */}
                <NavLink to="/"><img src={Logo} alt="Center Logo" className="w-28 lg:w-40" /></NavLink>
            </div>

            <div className='flex items-center mr-3 gap-6 item-center'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <div>
                    <NavLink to="/wishlist" value="/cart" className="text-white hover:text-gray-400 flex relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <div className='badge'>{items.length}</div>
                    </NavLink>
                </div>

                {/* ------------------------- filter  */}
                <div>
                    <Filter />
                </div>
            </div>
        </nav>
    );
};

export default Product_Navbar;
