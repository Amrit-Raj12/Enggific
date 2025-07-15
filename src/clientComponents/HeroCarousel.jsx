import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

const HeroCarousel = ({ carouselData }) => {
  
  
  return (
    <div className="w-full lg:mt-[110px] mt-0">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {carouselData.length > 0 && carouselData.map((item, index) => (
          <div key={index} className="w-full max-h-[762px] cursor-pointer" onClick={item.url && (() => window.open(item.url, '_blank'))}>
            <img
              src={item.bannerImage}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
