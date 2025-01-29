import Logo from '../../assets/images/categories/logo.png'
import { NavLink } from 'react-router-dom';
import Filter from '../Product/Filter'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectItems } from '../../Features/Wishlist/wishlistSlice';
import { ArrowLeftIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Product_Navbar = () => {
    const navigate = useNavigate();
    // select wishlist items from redux store to display the wishlist items count on Navbar
    const items = useSelector(selectItems);

    return (
        <nav className="flex items-center justify-between py-2 lg:py-3  bg-black text-white sticky top-0 z-10">

            <div className='flex items-center'>
                {/* go back */}
                <div to="/" className="ml-2 mr-2" onClick={() => navigate(-1)}>
                    <ArrowLeftIcon className="w-6 h-6" strokeWidth={2} />
                </div>

                {/* Center Logo */}
                <NavLink to="/"><img src={Logo} alt="Center Logo" className="w-28 lg:w-40" /></NavLink>
            </div>

            <div className='flex items-center mr-3 gap-6 item-center'>
                <div>
                    <MagnifyingGlassIcon strokeWidth={2} stroke="currentColor" className="w-6 h-6" />
                </div>
                <div>
                    <NavLink to="/wishlist" value="/cart" className="text-white hover:text-gray-400 flex relative">
                        <HeartIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
                        <div className='badgeMobile'>{items.length}</div>
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
