import React from 'react'
import { AnimatedListDemo } from "@/components/magicui/animated-list"
import { useNavigate } from 'react-router-dom';

const About = () => {

  const navigate = useNavigate()

  return (
    <div className="flex bg-[#F8F8F8] flex-col md:flex-row md:gap-[60px] gap-[30px] items-center justify-center md:px-[60px] px-[16px] md:py-[60px] py-[30px] md:my-[60px] my-[30px]">
      {/* Left Side - Animated List */}
      <div className="w-full xl:w-[40%]">
        {/* Removed the border for inspection */}
        <div className="md:flex lg:items-end lg:justify-end md:items-center md:justify-center rounded-[23.37px] overflow-hidden">
          <img src='/About_Image.png' alt="About Image" className="lg:w-[496px] w-full md:h-[452px] object-contain" />
        </div>
      </div>
      
      {/* Right Side - About Us */}
      <div className="w-full xl:w-[60%] flex flex-col items-start md:pl-8 md:mt-0">
        <p className="md:text-[38px] sm:mt-0 mt-[30px] text-[25px] bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text font-bold mb-[12px]">
          Know About Us
        </p>
        <p className="md:text-base text-[13px] text-textBlack text-left max-w-[688px] md:leading-[28px]">
          ENGGIFIC Engineering & Scientific is one of the pioneers engaged in
          offering <span className="font-bold">a wide range of Engineering & Scientific laboratory equipment</span>. We
          Manufacture, Export, Import, and Supply a wide range of LAB
          EQUIPMENTS which includes testing equipment, measuring devices,
          quality control equipment, scientific apparatus, land surveying
          instruments, site safety equipment, civil engineering equipment,
          mechanical lab testing machines, drawing instruments, construction
          machinery, and more.
        </p>
        <button onClick={()=> navigate('/about-us')} className="bg-gradient-to-r from-[#F8710C] to-[#F22B06] rounded-[5px] h-[38px] sm:h-[45px] px-[10px] sm:px-[18px] text-white text-center mt-[16px] sm:mt-[22px] sm:text-[15.25] text-[14px] hover:from-[#FFFFFF] hover:text-[#F22B06] hover:border border-[#F22B06] font-bold">
          Know More
        </button>
      </div>
    </div>
  );
};

export default About;