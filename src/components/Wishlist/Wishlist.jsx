import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromWishlistAsync,
  selectItems,
  updateWishlistAsync,
} from '../../Features/Wishlist/wishlistSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EmptyWishlist from './EmptyWishlist';
import { AttentionSeeker } from 'react-awesome-reveal';
import { ArrowLongLeftIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Wishlist() {

  // selectors
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get product from redux store
  const items = useSelector(selectItems);

  // calcuclate total wishlist Amount
  const totalAmount = items.reduce(
    (amount, item) => (Math.round(item.price - (item.price * (item.discountPercentage / 100))) * item.quantity + amount),
    0
  );
  // calculate total amount in wishlist
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  // change product quantity from the wishlist
  const handleQuantity = (e, item) => {
    dispatch(updateWishlistAsync({ ...item, quantity: + e.target.value }));
  };

  // remove the product from wishlist
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromWishlistAsync(id))
  }

  if (items.length == 0) {
    return <EmptyWishlist />
  }

  return (
    <>
      <div>
        <div className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 md:mb-0">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

            <h6 className='flex gap-3 mb-8 text-gray-500 cursor-pointer' onClick={() => navigate(-1)}>
              <ArrowLongLeftIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
              Back
            </h6>

            <h1 className="text-4xl font-bold tracking-tight text-gray-800 mb-8">
              Wishlist
            </h1>

            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6 hover:cursor-pointer" >
                    <div className="h-24 w-24 md:h-32 md:w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                        onClick={() => navigate(`/products/${item.id}`)}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className='capitalize'>
                            <a href={item.href}>{item.title}</a>
                          </h3>
                          <p className="ml-4">₹ {Math.round(item.price - (item.price * (item.discountPercentage / 100)))}.00</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          {item.brand}
                        </p>
                        <p className="my-2 text-sm text-gray-500">
                          Size : {item.selectedSize}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex gap-6">
                          <AttentionSeeker effect='bounce' delay={2000}>
                          <button
                            onClick={() => navigate(`/products/${item.id}`)}
                            type="button"
                            className="font-medium text-orange-800 hover:text-orange-500"
                          >
                            Buy Now
                          </button>
                          </AttentionSeeker>
                          <button
                            onClick={e => handleRemove(e, item.id)}
                            type="button"
                            className="font-medium text-black-600 hover:text-orange-500"
                          >
                            <TrashIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p className='font-semibold'>₹ {totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Wishlist</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/products">
                  <button
                    type="button"
                    className="font-medium text-orange-600 hover:text-orange-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}