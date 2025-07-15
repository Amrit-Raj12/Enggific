import { getAllBrands } from "@/redux/brandSlice";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useSelector, useDispatch } from "react-redux";

const CompanyBanners = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(false);

  const { brands } = useSelector((state) => state.brandList);

  // Detect mobile screen size on client side
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const loadBrands = async () => {
      if (brandsLoading) return; // Prevent multiple calls
      setBrandsLoading(true); // Set loading to true before fetching

      try {
        await dispatch(getAllBrands());
      } catch (error) {
        console.error("Failed to fetch enquiries:", error);
        // Optionally, you can set an error state here
      } finally {
        setBrandsLoading(false); // Always set loading to false after fetching
      }
    };

    loadBrands();
  }, [dispatch]);

  console.log(brands);

  return (
    <div className="xl:pt-[60px] pt-[30px]">
      <div className="md:text-center mb-[30px] md:px-[60px] px-[16px]">
        <h2 className="md:text-[38px] md:leading-[43.7px] text-[25px] leading-[29.9px] font-bold bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text">
          Our Clients
        </h2>

      </div>

      <Marquee className="bg-white dark:bg-primary md:pb-[60px] pb-[30px]" pauseOnHover={true} speed={80}>
        {(brands.length > 0 && brands[0].brandImages.length > 0) && brands[0].brandImages.map((brand, index) => (
          <img
            key={index}
            src={brand.url}
            width={isMobile ? 90 : 140}
            height={isMobile ? 40 : 64}
            alt={`image`}
            className="ml-6 mr-[30px]" // Added margin-right for spacing
            style={{
              aspectRatio: 3 / 2,
              objectFit: "contain",
              ...(isMobile && { maxWidth: "90px", maxHeight: "40px" })
            }}
          />
        ))}
      </Marquee>

    </div>
  );
};

export default CompanyBanners;