import React from 'react'
import { Product_Navbar, Navbar, Footer } from "../components/General";
import { TrackOrderForm } from '../components/TrackOrder';
import ScreenViewTracker from '../ScreenViewTracker';

const TrackOrderPage = ({ currentWidth }) => {
  return (
    <>
      {/* google analytics */}
      <ScreenViewTracker screenName="TrackOrderPage" />

      {
        currentWidth < 640 ? <Product_Navbar /> : <Navbar />
      }
      <TrackOrderForm />
      <Footer />
    </>
  )
}

export default TrackOrderPage