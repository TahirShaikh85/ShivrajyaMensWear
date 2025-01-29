import React, { useState, useEffect, Suspense } from "react";
import { Search, Navbar, Footer } from "../components/General";
import { Banner, Categories, DeliveryFeatures, FeaturedProducts, DiscountBannerHome, ImgSection } from "../components/Home";
import externalImages from "../assets/external-img.json"

export default function HomePage({ currentWidth }) {

  return (
    <div>
      <Navbar />
      {currentWidth < 640 &&
        <div>
          <Search />
          <Banner images={externalImages.homePage_top_banners} />
          <Categories />
        </div>
      }
      {currentWidth > 640 &&
        <div>
          <Banner images={externalImages.banners} />
          <Categories />
        </div>
      }
      <DeliveryFeatures />
      <ImgSection />
      <FeaturedProducts />

      {
        currentWidth < 640 &&
        <>
          <DiscountBannerHome />
          <Banner images={externalImages.homePage_middle_banners} />
        </>
      }
      {/* <Contact /> */}
      <Footer />

    </div>
  );
}
