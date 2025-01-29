import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectedProduct, fetchProductsByIdAsync } from '../../Features/product/productSlice';
import { addToWishlistAsync } from '../../Features/Wishlist/wishlistSlice';
import { toast, ToastContainer } from 'react-toastify';
import { buyNowProduct } from '../../Features/checkout/checkoutSlice';
import { AttentionSeeker } from 'react-awesome-reveal';
import { logEvent } from "firebase/analytics";
import { analytics } from '../../../firebase';
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from '../General/Loader';
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

function ProductDetails() {
    // selectors
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    // fetch the product details
    useEffect(() => {
        dispatch(fetchProductsByIdAsync(params.id));
    }, [dispatch, params.id]);

    // select the current 'product' from redux store
    const product = useSelector(selectedProduct);

    // Show a preview of the clicked image
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    // change quantity
    const [quantity, setQuantity] = useState(1);

    // size options of the products
    const [selectedSize, setSelectedSize] = useState('default');

    // ************* add item to the wishlist *************
    const handleWishlist = (e) => {
        e.preventDefault();

        if (selectedSize == "default") {
            toast.error('Please select the size', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else { // if size is not selected don't allow to add in wishlist

            // *** get the wishlist items from localstorage to check the item is already in wishlist or not *** 
            let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

            // Check if the item already exists in the wishlist
            const isItemExists = wishlistItems.some((wishlistItem) => wishlistItem.id === product.id);

            if (!isItemExists) {
                dispatch(addToWishlistAsync({ ...product, quantity, selectedSize }))
                toast.success('Item added to Wishlist!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                // google analytics
                logEvent(analytics, "add_to_wishlist", {
                    product_id: params.id,
                    product_name: product.title,
                    product_price: product.price,
                  });

            } else {
                toast.error('Product Already in wishlist!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    // ************* buy now *************
    const handleBuyNow = (e) => {
        e.preventDefault();

        if (selectedSize == "default") {
            toast.error('Please select the size', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            const actualPrice = Math.round(product.price - (product.price * (product.discountPercentage / 100))) * quantity
            dispatch(buyNowProduct({ ...product, quantity, selectedSize, actualPrice }))
            navigate('/checkout?source=product');
            logEvent(analytics, "begin_checkout", {
                product_id: params.id,
                product_name: product.title,
                product_price:actualPrice,
                product_size:selectedSize,
                product_quantity:quantity
              });
        }
    }

    // display loading until the product detail is being fetched
    if (!product) {
        return <Loader/>;
    }
    return (
        <main className="item">
            <section className="img">
                <img src={selectedImage || product.thumbnail} alt="" className="img-main" />
                <div className="img-btns">
                    {product.images.map((image, index) => (
                        <button
                            className={`img-btn`}
                            key={index}
                        >
                            <img src={image} loading='lazy' alt="shoe product image" className="img-btn__img" onClick={() => handleImageClick(image)} />
                        </button>
                    ))}
                </div>
            </section>

            <section className="price">
                <div className="flex gap-x-5">
                    <h2 className="price-sub__heading capitalize">{product.brand}</h2>
                    {
                        product.label &&
                        <AttentionSeeker effect='bounce' duration={1000} delay={800}>
                            <div className="home-page-product-label inline-block m-0 uppercase" style={{ fontSize: "11px" }}>
                                <p className='' style={{}}>
                                    {product.label}
                                </p>
                            </div>
                        </AttentionSeeker>
                    }

                </div>
                <h1 className="price-main__heading font-agdasima">{product.title}</h1>
                <p className="price-txt mb-1">
                    {product.description}
                </p>
                <div className="price-box">
                    <div className="price-box__main">
                        <span className="price-box__main-new font-agdasima ">₹ {Math.round(product.price - (product.price * (product.discountPercentage / 100)))}.00</span>
                        <span className="price-box__main-discount"> {product.discountPercentage}%</span>
                    </div>
                    <span className="price-box__old">₹ {product.price}</span>
                </div>

                <div className="size-box flex justify-between text-black my-3">
                    <select required onChange={(e) => setSelectedSize(e.target.value)}>
                        <option value="default">Select size</option>
                        {
                            product.selectedSizes && product.selectedSizes.map((size, index) => (
                                <option value={size} key={size}>{size}</option>
                            ))
                        }
                    </select>
                    <ToastContainer />
                    <div className="wishlist" onClick={handleWishlist}>
                        <span className='hidden md:block'>Add to wishlist</span>
                        <HeartIcon className='w-6 h-6' strokeWidth={1.5} />
                    </div>
                </div>

                <div className="price-btnbox">
                    <div className="price-btns">
                        <button className="price-btn__add price-btn" onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}>
                            <PlusIcon className="price-btn__add-img price-btn__img w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} stroke="#ff8000" />
                        </button>
                        <span className="price-btn__txt">{quantity}</span>
                        <button className="price-btn__remove price-btn" onClick={() => setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))}>
                            <MinusIcon className="price-btn__add-img price-btn__img w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} stroke="#ff8000" />
                        </button>
                    </div>
                    <button className="price-cart__btn btn--orange" onClick={handleBuyNow}>
                        <ShoppingCartIcon className="price-cart__btn-img w-6 h-6" strokeWidth={1.5} />
                        Buy Now
                    </button>
                </div>
            </section>
        </main>
    );
}

export default ProductDetails;