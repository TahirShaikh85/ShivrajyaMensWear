import React, { useEffect, useRef } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoriesAsync, selectAllCategories } from '../../Features/product/productSlice';
import { productCategory ,fetchProductsByFiltersAsync } from '../../Features/product/productSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Categories = () => {
    const categoryContainerRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newCategories = useSelector(selectAllCategories);

    useEffect(()=>{
        dispatch(fetchAllCategoriesAsync());
    },[dispatch])

    const scrollLeft = () => {
        const container = categoryContainerRef.current;
        container.scrollLeft -= 100; // Adjust the scroll distance as needed
    };

    const scrollRight = () => {
        const container = categoryContainerRef.current;
        container.scrollLeft += 100; // Adjust the scroll distance as needed
    };

    const navigateToCategory = (label)=>{
        navigate('/products');
        dispatch(productCategory(label));
        dispatch(fetchProductsByFiltersAsync({"category":label}));
    }

    return (
        <div className='category-wrapper py-4 md:py-3 px-0 md:px-12'>
            <div className="category-container flex flex-row gap-6 md:gap-7 overflow-x-scroll hide-scrollbar" ref={categoryContainerRef}>
                    <NavLink to="/" value="/" className="category-box">
                        <div className="image-box w-20 h-20 md:w-24 md:h-24 pixalated">
                            <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fbigsale.png?alt=media&token=fc9f0c93-37ce-42d8-83eb-6a8e5b5d6168" alt="shirts" className='w-full h-full' style={{ borderRadius: '50%' }} />
                        </div>
                    </NavLink>
                {newCategories.map((category, index) => (
                    <Fade delay={500} direction='left' triggerOnce={true} key={index}>
                        <div  className="category-box"  onClick={()=>navigateToCategory(category.value)}>
                            <div className="image-box w-20 h-20 md:w-24 md:h-24 pixalated">
                                <img src={category.img} alt={category.value} className='w-full h-full' style={{ borderRadius: '50%' }} />
                            </div>
                            <div className="name text-center w-[93px] whitespace-nowrap overflow-hidden text-clip mt-2 text-sm text-gray-700">
                                {category.label}
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
            <div className="scroll-buttons-container hidden md:block">
                <button className="scroll-buttons right-scroll" onClick={scrollRight}>
                    <ChevronRightIcon className='w-6 h-6' stroke='orange' strokeWidth={2}/>
                </button>
                <button className="scroll-buttons left-scroll" onClick={scrollLeft}>
                    <ChevronLeftIcon className='w-6 h-6' stroke='orange' strokeWidth={2}/>
                </button>
            </div>
        </div>
    );
};

export default Categories;
