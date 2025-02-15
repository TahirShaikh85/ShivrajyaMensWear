import React from 'react'
import { Flip } from 'react-awesome-reveal'

const DiscountBannerHome = () => {
    return (
        <Flip delay={3000}>
            <div className="discount-banner-home border mx-4 my-6" style={{ borderRadius: '4px' }}>
                <div className="grid grid-cols-7 gap-0 text-center">
                    <div className="col-span-5 mb-0 py-2 border-dashed border-r" style={{ lineHeight: '1rem' }}>
                        <span className="text-sm mb-1 font-bold">Get Flat 10% off*</span> <br />
                        <span className="text-sm mb-1">on your first purchase</span>
                    </div>
                    <div className="col-span-2 py-2 flex justify-center align-middle mt-2">
                        <span className="text-white">FLAT10</span>
                    </div>
                </div>
            </div>
        </Flip>

    )
}

export default DiscountBannerHome