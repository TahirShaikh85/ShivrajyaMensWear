import { BanknotesIcon, PhoneArrowUpRightIcon, ScaleIcon, TruckIcon } from '@heroicons/react/24/outline';
import SmallDivider from '../General/SmallDivider';

const DeliveryFeatures = () => {
    return (
        <section className='delivery-features py-4 mb-4 md:py-6 md:mt-0'>
            <h4 className='text-center uppercase text-2xl font-bold text-gray-800 tracking-widest font-agdasima'>
                <mark className='bg-accent-light'>Welcome to Store</mark>
            </h4>
            <SmallDivider />
            <p className='text-gray-600 w-[95%] md:w-1/2 mx-auto text-center px-2 mb-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas praesentium quis aut soluta quos nobis fugiat recusandae voluptas corporis ullam.
            </p>
            <div className="delivery-features-container grid grid-cols-2 md:flex md:flex-row gap-x-4 gap-y-6 md:gap-14 justify-center">
                <div className="d-feature text-center">
                    <TruckIcon className='w-8 h-8 mx-auto mb-2' />
                    <mark className='font-semibold bg-accent-light'>Free Delivery</mark>
                    <p className='text-sm mt-1 text-gray-600'>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="d-feature text-center">
                    <BanknotesIcon className='w-8 h-8 mx-auto mb-2' />
                    <mark className='font-semibold bg-accent-light'>Cash on Delivery</mark>
                    <p className='text-sm mt-1 text-gray-600'>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="d-feature text-center">
                    <ScaleIcon className='w-8 h-8 mx-auto mb-2' />
                    <mark className='font-semibold bg-accent-light'>Lowest Price</mark>
                    <p className='text-sm mt-1 text-gray-600'>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="d-feature text-center">
                    <PhoneArrowUpRightIcon className='w-8 h-8 mx-auto mb-2' />
                    <mark className='font-semibold bg-accent-light'>Customer Support</mark>
                    <p className='text-sm mt-1 text-gray-600'>Lorem ipsum dolor sit amet</p>
                </div>
            </div>
        </section>
    )
}

export default DeliveryFeatures