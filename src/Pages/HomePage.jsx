import React, { useState, useEffect,Suspense } from "react";
import Search from "../components/General/Search";
import Categories from "../components/Home/Categories";
import Banner from "../components/Home/Banner";
import DeliveryFeatures from "../components/Home/DeliveryFeatures";
import FeaturedProducts from "../components/Home/FeaturedProducts"
import Navbar from "../components/General/Navbar";
import Contact from "../components/Home/Contact";
import Footer from "../components/General/Footer";
import DiscountBannerHome from "../components/Home/DiscountBannerHome";
import externalImages from "../assets/external-img.json"
import ImgSection from "../components/Home/ImgSection";

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
      <Contact />
      <Footer />

    </div>
  );
}
