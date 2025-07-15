import React from 'react'


const ChooseUs = () => {

    const data = [
        {
            icon: [(<img className='md:w-[38px] md:h-[38px] w-[32px] h-[32px]' src='/Award--Streamline-Tabler-Filled.svg' />)],
            title: 'Unmatched Quality Standards',
            decription: 'We are committed to delivering laboratory equipment that meets the highest international quality standards, ensuring precision and durability for all your scientific needs.'
        },
        {
            icon: [(<img className='md:w-[38px] md:h-[38px] w-[32px] h-[32px]' src='/Bag-Suitcase-4--Streamline-Plump-Remix.svg' />)],
            title: 'Comprehensive Product Range',
            decription: 'Our extensive portfolio includes cutting-edge engineering and scientific equipment tailored to meet the requirements of various industries, research institutions, and educational organizations.'
        },
        {
            icon: [(<img className='md:w-[38px] md:h-[38px] w-[32px] h-[32px]' src='/Group-Fill--Streamline-Mingcute-Fill.svg' />)],
            title: 'Expert Team',
            decription: 'With years of expertise, our skilled professionals provide technical support and guidance, helping you select the right equipment for your applications.'
        },
        {
            icon: [(<img className='md:w-[38px] md:h-[38px] w-[32px] h-[32px]' src='/Call-Center-Support-Service--Streamline-Core.svg' />)],
            title: 'Reliable After-Sales Support',
            decription: 'Our dedicated support team is always available for maintenance, troubleshooting, and ensuring the longevity of your equipment.'
        },
        {
            icon: [(<img className='md:w-[38px] md:h-[38px] w-[36px] h-[36px]' src='/Alarm-Clock--Streamline-Core.svg' />)],
            title: 'On-Time Delivery',
            decription: 'We prioritize your schedules by ensuring prompt and reliable delivery, so you can focus on your work without delays.'
        },
        {
            icon: [(<img className='md:w-[38px] md:h-[38px] w-[36px] h-[36px]' src='/Document-Currency-Rupee--Streamline-Heroicons.svg' />)],
            title: 'Competitive Pricing',
            decription: 'We combine affordability with quality, ensuring you get the best value for your investment without compromising on performance.'
        }
    ]

    return (
        <div className='md:px-[60px] px-[16px] md:pb-[60px] pb-[30px]'>
            {/* <AnimatedComponent> */}
            <div className=''>
                <div className="flex flex-col items-center justify-center text-center">
                    <div >
                        <h3 className='md:text-2xl text-base text-textBlack'>The benefits of</h3>
                        <div className="relative">
                            <h2 className='md:text-[38px] md:leading-[43.7px] text-[25px] leading-[29.9px] font-bold bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text'>
                                Choosing us
                            </h2>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-[29px] gap-[20px]  md:mt-[60px] mt-[30px]'>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="w-full pb-[36px] px-[45px] group transition-all duration-300 rounded-[15px]"
                            style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)' }}
                        >
                            <div className="flex flex-col">
                                <div className="top-0 left-[5%] bg-gradient-to-r from-[#F8710C] to-[#F22B06] w-[50px] h-[60px] md:w-[60px] md:h-[72px] flex items-center justify-center mb-[25px]">
                                    {item.icon}
                                </div>
                                <p className="text-[19.9px] lg:text-[22px] leading-[23px] md:leading-normal text-textBlack font-bold break-words mb-[12px]">
                                    {item.title}
                                </p>
                                <p className="md:text-[13px] lg:text-base text-textBlack text-[14px] leading-[24px]">{item.decription}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}

export default ChooseUs