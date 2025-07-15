import React from 'react'
import { Carousel } from 'react-responsive-carousel'


const KnowUs = () => {
    return (
        <div className='md:px-[60px] px-[16px] md:pb-[60px] pb-[30px] bg-[#F8F8F8] md:mt-[60px] mt-[30px] md:pt-[60px] pt-[30px] sm:pb-[40px]'>
            <div className="flex md:flex-row flex-col justify-between gap-[60px]">
                <div
                    className={`md:w-1/2 w-full h-auto`}
                >
                    <div className='w-[90px] h-[4px] bg-[#E5810C] mb-[15px]' />

                    <div className='mb-[10px] sm:mb-[15px]'>
                        <h2 className='md:text-[38px] text-[32px] leading-[36px] font-bold bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text'>Hear It from Those Who Know Us Best</h2>
                    </div>

                    <p className='text-[14px] sm:text-base text-textBlack mb-[10px] sm:mb-[15px] leading-[24px]'>Discover how our top-quality lab equipment and exceptional service have made a difference for professionals and organizations worldwide.</p>

                    <div>
                        <svg width={148} height={74} viewBox="0 0 148 74" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width={148} height={74} fill="url(#pattern0_1795_1162)" />
                            <defs>
                                <pattern id="pattern0_1795_1162" patternContentUnits="objectBoundingBox" width={1} height={1}>
                                    <use xlinkHref="#image0_1795_1162" transform="scale(0.005 0.01)" />
                                </pattern>
                                <image id="image0_1795_1162" width={200} height={100} xlinkHref="data:image/png;base64,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" />
                            </defs>
                        </svg>
                    </div>
                </div>


                <div className="h-full md:w-1/2 w-full">
                    <div className='w-full h-full mt-[10px] cursor-pointer'>
                        <Carousel
                            showArrows={true}
                            autoPlay={true}
                            infiniteLoop={true}
                            showThumbs={false}
                            showStatus={false}
                            showIndicators={false}
                            emulateTouch={true}
                            interval={3000}
                            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                                hasPrev && (
                                    <button
                                        type="button"
                                        onClick={onClickHandler}
                                        title={label}
                                        style={{ backgroundColor: '#F8F8F8' }}
                                        className="absolute hidden  left-0 top-1/2 transform -translate-y-1/2 p-2 z-10 h-full"
                                    >
                                        <svg width={38} height={38} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.1036 18.9624L24.6145 11.4515L22.9834 9.82031L13.8413 18.9624L22.9834 28.1045L24.6145 26.4733L17.1036 18.9624Z" fill="#8C8C8C" />
                                        </svg>
                                    </button>
                                )
                            )}
                            renderArrowNext={(onClickHandler, hasNext, label) => (
                                hasNext && (
                                    <button
                                        type="button"
                                        onClick={onClickHandler}
                                        title={label}
                                        style={{ backgroundColor: '#F8F8F8' }}
                                        className="absolute hidden  right-0 top-1/2 transform -translate-y-1/2 p-2 z-10 h-full"
                                    >
                                        <svg width={38} height={38} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.8964 18.9624L13.3855 11.4515L15.0167 9.82031L24.1588 18.9624L15.0167 28.1045L13.3855 26.4733L20.8964 18.9624Z" fill="#8C8C8C" />
                                        </svg>
                                    </button>
                                )
                            )}
                        >
                            <div className='bg-white md:px-[69px] px-[20px] py-[10px] sm:py-[39px] md:rounded-[12px]'>
                                <p className='md:text-[18px] leading-[28px] text-[14px] text-textBlack text-left'>The lab equipment we purchased exceeded our expectations in terms of quality and precision. The team provided excellent support, guiding us through the entire process. Highly recommend them for reliable scientific solutions</p>

                                <div className='flex justify-between items-center mt-[15px]'>
                                    <div>
                                        <p className='text-base font-bold'>Dr. A. Kumar</p>
                                        <p className='text-xs text-textBlack'>Research Scientist</p>
                                    </div>

                                    <div className='flex gap-[2px]'>
                                        {[...Array(5)].map((_, index) => (
                                            <svg key={index} width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.91433 0L10.9542 6.27807H17.5554L12.2149 10.1581L14.2548 16.4362L8.91433 12.5561L3.57388 16.4362L5.61375 10.1581L0.2733 6.27807H6.87446L8.91433 0Z" fill="#DDA304" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white md:px-[69px] px-[20px] py-[10px] sm:py-[39px] md:rounded-[12px]'>
                                <p className='md:text-[18px] leading-[28px] text-[14px] text-textBlack text-left'>The lab equipment we purchased exceeded our expectations in terms of quality and precision. The team provided excellent support, guiding us through the entire process. Highly recommend them for reliable scientific solutions</p>

                                <div className='flex justify-between items-center mt-[15px]'>
                                    <div>
                                        <p className='text-base font-bold'>Dr. A. Kumar</p>
                                        <p className='text-xs text-textBlack'>Research Scientist</p>
                                    </div>

                                    <div className='flex gap-[2px]'>
                                        {[...Array(5)].map((_, index) => (
                                            <svg key={index} width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.91433 0L10.9542 6.27807H17.5554L12.2149 10.1581L14.2548 16.4362L8.91433 12.5561L3.57388 16.4362L5.61375 10.1581L0.2733 6.27807H6.87446L8.91433 0Z" fill="#DDA304" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default KnowUs