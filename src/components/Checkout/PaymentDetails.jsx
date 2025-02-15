import React from 'react'
import { selectBuyNowProduct, selectPaymentMode } from '../../Features/checkout/checkoutSlice'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAsync, orderId } from '../../Features/orders/orderSlice';
import { useNavigate } from 'react-router-dom';
import { logEvent } from "firebase/analytics";
import { analytics } from '../../../firebase';
import OrderSummary from './OrderSummary';
import { AtSymbolIcon, IdentificationIcon, PhoneIcon } from '@heroicons/react/24/outline';

// environment variables
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
const RAZOR_PAY_KEY_ID = import.meta.env.VITE_REACT_APP_RAZOR_PAY_KEY_ID;

const districtsOfMaharashtra = [
    { value: 'Ahmednagar', label: 'Ahmednagar' },
    { value: 'Akola', label: 'Akola' },
    { value: 'Amravati', label: 'Amravati' },
    { value: 'SambhajiNagar (Aurangabad)', label: 'SambhajiNagar (Aurangabad)' },
    { value: 'Beed', label: 'Beed' },
    { value: 'Bhandara', label: 'Bhandara' },
    { value: 'Buldhana', label: 'Buldhana' },
    { value: 'Chandrapur', label: 'Chandrapur' },
    { value: 'Dhule', label: 'Dhule' },
    { value: 'Gadchiroli', label: 'Gadchiroli' },
    { value: 'Gondia', label: 'Gondia' },
    { value: 'Hingoli', label: 'Hingoli' },
    { value: 'Jalgaon', label: 'Jalgaon' },
    { value: 'Jalna', label: 'Jalna' },
    { value: 'Kolhapur', label: 'Kolhapur' },
    { value: 'Latur', label: 'Latur' },
    { value: 'Mumbai City', label: 'Mumbai City' },
    { value: 'Mumbai Suburban', label: 'Mumbai Suburban' },
    { value: 'Nagpur', label: 'Nagpur' },
    { value: 'Nanded', label: 'Nanded' },
    { value: 'Nandurbar', label: 'Nandurbar' },
    { value: 'Nashik', label: 'Nashik' },
    { value: 'Osmanabad', label: 'Osmanabad' },
    { value: 'Palghar', label: 'Palghar' },
    { value: 'Parbhani', label: 'Parbhani' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Raigad', label: 'Raigad' },
    { value: 'Ratnagiri', label: 'Ratnagiri' },
    { value: 'Sangli', label: 'Sangli' },
    { value: 'Satara', label: 'Satara' },
    { value: 'Sindhudurg', label: 'Sindhudurg' },
    { value: 'Solapur', label: 'Solapur' },
    { value: 'Thane', label: 'Thane' },
    { value: 'Wardha', label: 'Wardha' },
    { value: 'Washim', label: 'Washim' },
    { value: 'Yavatmal', label: 'Yavatmal' },
];

const PaymentDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentBuyNowProduct = useSelector(selectBuyNowProduct);
    const paymentMethod = useSelector(selectPaymentMode);

    // calculate actucalPrice + deliveryCharge
    let totalAmount = currentBuyNowProduct.actualPrice + currentBuyNowProduct.deliveryCharge;

    // react hook form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // razorpay payment model
    const onCloseHandler = () => {
        console.log("model closed");
    }

    // ** Place Order button **
    const onSubmit = (formAddressData) => {

        reset();

        // send this details to backend to verify payment
        const orderDetails = {
            id: currentBuyNowProduct.id,
            title: currentBuyNowProduct.title,
            quantity: currentBuyNowProduct.quantity,
            thumbnail: currentBuyNowProduct.thumbnail,
            phone: formAddressData.phone,
            email: formAddressData.email,
        }

        // call razorpay payment handler
        // also pass the address information to the function so that it can be use in dispatch(createOrderAsycn())
        handlePayment(orderDetails, formAddressData);
    }

    // initiate razorpay payment 
    const initPayment = (data, orderDetails, formAddressData) => {
        const options = {
            key: RAZOR_PAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: orderDetails.title,
            description: "Shivrajya the brands men's wear",
            image: orderDetails.thumbnail,
            order_id: data.id,
            prefill: {
                contact: orderDetails.phone,
                email: orderDetails.email,
            },
            theme: {
                color: "#ffa347",
            },
            handler: async function (response, paymentSuccess) {
                try {
                    const verifyUrl = `${baseUrl}/payment/verify`;
                    const verifyResponse = await fetch(verifyUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...response, paymentSuccess }),
                    });

                    const verifyData = await verifyResponse.json();

                    // if payment verification is successfull
                    if (verifyData.paymentSuccess) {

                        // save orderId on redux store to display to the user
                        dispatch(orderId(data.id));

                        const order = {
                            currentBuyNowProduct,
                            orderId: data.id,
                            totalAmount,
                            paymentMethod,
                            address: formAddressData,
                            status: 'pending'
                        };

                        // google analytics
                        logEvent(analytics, "place_order");

                        // create the order
                        dispatch(createOrderAsync(order));


                        // when payment is successfull navigate to order-success page
                        navigate(`/order-success`)
                    }


                } catch (error) {
                    console.log(error);
                    // Handle errors here if necessary
                }
            }, // handler function end

        }; // options end

        if (typeof window !== "undefined") {

            const rzp1 = new window.Razorpay(options);

            rzp1.on('payment.success', function (response) {
                options.handler(response, true);  // On successful payment, call the handler function with the success flag
            });

            rzp1.on('payment.error', function (response) {
                options.handler(response, false);  // On payment error, call the handler function with the success flag
            });
            rzp1.on('razorpay_payment_failed', function () {
                // On payment failed (user closed the modal), call the handler function with the success flag set to false
                options.handler({}, false);
                onCloseHandler(); // Call the onCloseHandler to trigger the desired action when the modal is closed without successful payment
            });

            rzp1.open();
        }
    };

    // main razorpay function 
    const handlePayment = async (orderDetails, formAddressData) => {

        try {
            const orderUrl = `${baseUrl}/payment`;
            const response = await fetch(orderUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderDetails,
                }),
            });
            const data = await response.json();

            // call the razorpay payment initiater function & pass the orderDetails also
            initPayment(data.data, orderDetails, formAddressData);

        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to be caught by the thunk
        }
    };

    // ----------------------------- 
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-10 px-4 pt-8 lg:mt-0" noValidate>
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>
                <div className="">
                    {/* contact information */}
                    <div className="contact-info mt-6 mb-2">
                        <h3 className='mb-4 font-bold'>Contact Information</h3>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.email ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="your.email@gmail.com"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <AtSymbolIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="phone" className="block text-sm font-medium mb-2">Mobile Number*</label>
                            <div className="relative">
                                <input type="tel"
                                    id="phone"
                                    name="phone"
                                    className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.phone ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="9579267386"
                                    {...register("phone", {
                                        required: "Phone Number is required",
                                        pattern: {
                                            value: /^[7-9]\d{9}$/,
                                            message: "Invalid Mobile Number"
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="fullName" className="mt-4 mb-2 block text-sm font-medium">Full Name*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className={`w-full rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.fullName ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Your full name here"
                                    {...register("fullName", {
                                        required: "Name is required",
                                        pattern: {
                                            value: /^.{4,}$/,
                                            message: "Full Name must have at least four characters",
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <IdentificationIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                        </div>
                    </div>

                    {/* shipping information */}
                    <div className="contact-info mt-6 mb-2">
                        <h3 className='mb-4 font-bold'>Shipping Information</h3>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="address" className="block text-sm font-medium mb-2">Address Line*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.address ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Gondhawani road, ward no: 01"
                                    {...register("address", {
                                        required: "Address is required",
                                        pattern: {
                                            value: /^.{8,}$/,
                                            message: "Please Provide detailed address",
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <AtSymbolIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="landmark" className="block text-sm font-medium mb-2">Landmark</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="landmark"
                                    name="landmark"
                                    className={`w-full rounded-md border ${errors.landmark ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.landmark ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Enter Landmark"
                                    {...register("landmark")}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <AtSymbolIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.landmark && <p className="text-red-500 text-xs mt-1">{errors.landmark.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="city" className="mt-4 mb-2 block text-sm font-medium">City*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className={`w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.city ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Shrirampur"
                                    {...register("city", {
                                        required: "City is required",
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <IdentificationIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <select type="text"
                                name="district"
                                className={`w-full rounded-md border ${errors.district ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.district ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                {...register('district', { required: 'District is required' })}
                            >
                                <option value="">District</option>

                                {/* map through district array */}
                                {districtsOfMaharashtra.map((district) => (
                                    <option key={district.value} value={district.value}>
                                        {district.label}
                                    </option>
                                ))}

                            </select>
                            {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="pincode" className="mt-4 mb-2 block text-sm font-medium">Pincode*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    className={`w-full rounded-md border ${errors.pincode ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.pincode ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="413 709"
                                    {...register("pincode", {
                                        required: "Pincode is required",
                                        pattern: {
                                            value: /^\d{6}$/,
                                            message: "Pincode must be 6 digit",
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <IdentificationIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                        </div>
                    </div>

                    {/* ----- include order summary ------- */}
                    <OrderSummary />

                    {/* <!-- Total --> */}
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                            <p className="font-semibold text-gray-900">₹{currentBuyNowProduct.actualPrice}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Delivery Charges</p>
                            <p className={`font-semibold ${currentBuyNowProduct.deliveryCharge == 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                {
                                    currentBuyNowProduct.deliveryCharge == 0 ? "Free" : `₹ ${currentBuyNowProduct.deliveryCharge}`
                                }
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">₹ {totalAmount}</p>
                    </div>
                </div>

                <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
            </form>
        </>
    )
}

export default PaymentDetails