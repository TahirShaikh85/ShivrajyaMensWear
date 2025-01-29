import './App.css'
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { fetchWishlistItemsAsync } from "./Features/Wishlist/wishlistSlice";
import { fetchAllProductsAsync } from "./Features/product/productSlice";
import { HomePage, ProductListPage, ProductDetailsPage, CheckoutPage, TrackOrderPage, WishlistPage, PageNotFound, OrderSuccessPage, PrivacyPage, TermsPage } from "./Pages"
import { BottomNav, ScrollToTop} from "./components/General";


export default function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();

  const handleSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // ******** fetch wishlist ********
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWishlistItemsAsync())
    dispatch(fetchAllProductsAsync())
  }, [dispatch])

  return (
    <>
      <ScrollToTop />
      {/* <Product_Navbar/> */}
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route exact path="/" element={<HomePage currentWidth={width} />}></Route>
        <Route exact path="/products" element={<ProductListPage currentWidth={width} />}></Route>
        <Route exact path="/products/:id" element={<ProductDetailsPage currentWidth={width} />}></Route>
        <Route exact path="/checkout" element={<CheckoutPage />}></Route>
        <Route exact path="/track-order" element={<TrackOrderPage currentWidth={width} />}></Route>
        <Route exact path="/wishlist" element={<WishlistPage currentWidth={width} />}></Route>
        <Route exact path="/order-success" element={<OrderSuccessPage />}></Route>

        <Route exact path="/privacypolicy" element={<PrivacyPage />}></Route>
        <Route exact path="/terms" element={<TermsPage />}></Route>
      </Routes>

      {width < 640 && <BottomNav />}
    </>
  )
}