import React, { Suspense } from 'react'
const ProductList = React.lazy(() => import('../components/Product/ProductList'));
import { Product_Navbar, Loader, Navbar } from '../components/General'
import { CategoryChips, DiscountBanner } from '../components/Product'
import ScreenViewTracker from '../ScreenViewTracker';

const ProductListPage = ({ currentWidth }) => {
  return (
    <div>
      {/* google analytics */}
      <ScreenViewTracker screenName="ProductListPage" />
      {
        currentWidth < 640 ? <Product_Navbar /> : <Navbar />
      }
      {
        currentWidth < 640 &&
        <div>
          <CategoryChips />
          <DiscountBanner />
        </div>
      }
      <Suspense fallback={<Loader />}>
        <ProductList currentWidth={currentWidth} />
      </Suspense>
    </div>
  )
}

export default ProductListPage