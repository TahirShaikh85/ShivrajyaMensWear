import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import productReducer from './product/productSlice';
import wishlistReducer from './Wishlist/wishlistSlice';
import checkoutReducer from './checkout/checkoutSlice';
import orderReducer from './orders/orderSlice';
import trackOrderReducer from './trackOrder/trackOrderSlice';

import { trackOrderApi } from './trackOrder/trackOrderApi';

export const store = configureStore({
  reducer: {
    [trackOrderApi.reducerPath]:trackOrderApi.reducer,
    product: productReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    trackOrder:trackOrderReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trackOrderApi.middleware),
})