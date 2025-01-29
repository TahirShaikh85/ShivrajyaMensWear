import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllProducts, selectedProductCategory } from '../../Features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function Allproducts() {
    const newProducts = useSelector(selectAllProducts);
    const selectedProductCat = useSelector(selectedProductCategory);
    const navigate = useNavigate();

    return (
        <div className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-6">
            <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                {newProducts.map((product) => (
                    <div key={product.id} className="group relative"
                        onClick={() => navigate(`/products/${product.id}`)}
                        style={{ background: "var(--light-grayish-blue)" }}
                    >
                        <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                loading='lazy'
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                            <div className='hover:cursor-pointer'>
                                <HeartIcon stroke="#000" strokeWidth={1.8} 
                                style={{ left: "82%", background: "white", borderRadius: "50%", padding: ".2rem" }}F
                                className="w-6 h-6 absolute top-1 hover:cursor-pointer" />
                            </div>
                        </div>

                        <div className="mt-1 px-2 mb-2 inline-block m-0 uppercase flex justify-between items-center">
                            <p className='text-sm text-gray-500 mt-1' style={{ fontSize: "12px" }}>
                                {product.brand}
                            </p>
                            {
                                product.label &&
                                <p className='home-page-product-label mt-1 inline-block m-0 uppercase' style={{ fontSize: "10px" }}>
                                        {product.label == "Featured Product" ? "Featured" : product.label}
                                </p>
                            }
                        </div>

                        <div className="flex justify-between px-2 pb-2">
                            <h3 className="text-sm text-gray-800">
                                {product.title}
                            </h3>
                            <p className="text-sm  font-medium text-gray-800 text-right">
                                ₹{Math.round(product.price - (product.price * (product.discountPercentage / 100)))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}