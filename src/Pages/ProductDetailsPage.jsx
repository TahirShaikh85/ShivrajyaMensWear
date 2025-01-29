import React, { Suspense } from 'react'
const ProductDetails = React.lazy(() => import('../components/Product/ProductDetails'))
import { Navbar, Product_Navbar, Footer, Loader } from '../components/General';
import { Categories } from '../components/Home';
import { useParams } from 'react-router-dom';
import ScreenViewTracker from '../ScreenViewTracker';

const ProductDetailsPage = ({ currentWidth }) => {
    const productId = useParams();
    return (
        <div>
            <ScreenViewTracker screenName="ProductDetailsPage" />
            {
                currentWidth < 640 ? <Product_Navbar /> : <Navbar />
            }
            <Suspense fallback={<Loader />}>
                <ProductDetails productId={productId} />
                <div className='mx-auto mb-6 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8'>
                    <h2 className="text-xl md:text-2xl ml-4 text-gray-900 text-left mt-0 md:mt-10 py-2">
                        <mark className='bg-accent-light'>Shop by categories</mark>
                    </h2>
                    <Categories />
                </div>
                <Footer />
            </Suspense>
        </div>
    )
}

export default ProductDetailsPage