import React from 'react'
import { selectAllProducts } from '../../Features/product/productSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SmallDivider from '../General/SmallDivider';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function FeaturedProducts() {
  const allProducts = useSelector(selectAllProducts);
  const featuredProducts = allProducts.filter((product) => product.label === 'Featured Product');

  const navigate = useNavigate();

  return (
    <div className="px-0 md:px-12 pt-0 pb-0 sm:px-6 sm:pt-10">
      <h2 className="text-2xl tracking-widest font-bold text-gray-900 text-center font-agdasima">
        Featured Products
      </h2>
      <SmallDivider />

      <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
        {featuredProducts.map((product) => (
          <div key={product.id} className="group relative" onClick={() => navigate(`products/${product.id}`)}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.thumbnail}
                alt={product.brand}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="home-page-product-label mt-3 inline-block m-0 uppercase" style={{ fontSize: "10px" }}>
              <p className='' style={{}}>
                {product.label}
              </p>
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">₹{Math.round(product.price - (product.price * (product.discountPercentage / 100)))}</p>
            </div>
          </div>
        ))}
      </div>
      <h4 className='text-center pt-4 flex justify-center items-center cursor-pointer text-gray-700 font-semibold' onClick={()=>navigate('/products')}>
        Explore products of our store <ArrowLongRightIcon className='ml-2 w-5 h-5' />
      </h4>
    </div>
  )
}