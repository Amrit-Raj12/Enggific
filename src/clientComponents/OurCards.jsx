import { Globe } from "@/components/magicui/globe";


const OurCards = () => {
  return (
    <div className='bg-[#F8F8F8] flex justify-center items-center  px-[16px] sm:px-[40px] md:px-[60px]'>
      <div className='flex flex-col md:flex-row justify-between items-center w-full relative min-h-[500px]'>
        {/* Vision Card - Left Side */}
        <div className='w-full sm:w-[calc(50%-14.5px)] md:w-[calc(25%-14.5px)] 450:mb-8 md:mb-0'>
          <div className='w-[90px] h-[4px] bg-gradient-to-r from-[#F8710C] to-[#F22B06] mb-[15px]' />
          <div className='mb-[10px] sm:mb-[15px]'>
            <p className='md:text-[38px] text-[32px] font-bold bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text'>Our Vision</p>
          </div>
          <div>
            <p className='md:text-base text-[13px] leading-[24px]'>To be a global leader in the engineering and scientific equipment industry, recognized for excellence in manufacturing, commitment to innovation, and dedication to empowering education, research, and industrial growth through world-class solutions.</p>
          </div>
        </div>

        {/* Globe Component - Center */}
        <div className='w-full 500:w-[60%] sm:w-[50%]  md:w-[40%] h-[320px] flex justify-center items-center  '>
          <Globe className="relative" />
        </div>

        {/* Mission Card - Right Side */}
        <div className='w-full sm:w-[calc(50%-14.5px)] md:w-[calc(25%-14.5px)] '>
          <div className='w-[90px] h-[4px] bg-gradient-to-r from-[#F8710C] to-[#F22B06] mb-[10px]  sm:mb-[15px]' />
          <div className='mb-[10px] sm:mb-[15px]'>
            <p className='md:text-[38px] text-[32px] font-bold bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text'>Our Mission</p>
          </div>
          <div>
            <p className='md:text-base text-[13px]'>To deliver high-quality, reliable, and innovative engineering and scientific laboratory equipment that supports educational institutions, research organizations, and industries worldwide—enabling precision, safety, and advancement in scientific and technical fields.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCards;