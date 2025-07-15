import { BASE_URL } from '@/constants';
import React from 'react'
import useFetchData from './utils/useFetchData';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clientLogin } from '@/redux/clientSlice/clientAuthSlice';
import { addId } from '@/redux/clientSlice/idSlice';
import Loader from './Loader';

const LaunchedProducts = () => {

    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.clientAuth);
    const [showLogin, setShowLogin] = useState(false);
    const [productTobeEnquire, setProductTobeEnquire] = useState(null);

    const navigate = useNavigate();

    const apiUrl = `${BASE_URL}/user/get/products`;

    const { data, loading, error } = useFetchData(apiUrl);


    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    // console.log("data pr", data)

    const handleNavigate = (categoryName, categoryId, subCategoryName, productName, productId) => {
        dispatch(addId({ idType: "product", id: productId }));
        navigate(`${subCategoryName.replace(/\s+/g, '-')}/${productName.replace(/\s+/g, '-').replace(/’’\/5/, '.5inch')}/${productId}
`)
    }

    const handleEnquireNow = async (id) => {
        setProductTobeEnquire(id)
        setShowLogin(true)
    };

    const handleLoginSuccess = async () => {
        await dispatch(clientLogin());
        setShowLogin(false); // Close popup on success
    };

    if (data.products && data.products.length === 0) return null

    return (
        <div className='md:px-[60px] px-[16px]  md:mb-[60px] mb-[30px]'>
            <div>
                <div className="flex flex-col md:items-center md:justify-center md:text-center">
                    <div className='md:mb-[40px] mb-[30px]'>
                        <h3 className='md:text-2xl text-base text-textBlack'>What's new</h3>
                        <div className="relative">
                            <h2 className='md:text-[38px] md:leading-[43.7px] text-[25px] leading-[29.9px] font-bold bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text'>
                                Newly Launched Products
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap md:justify-center justify-between gap-[16px] md:gap-[29px] ">
                    {(data.products && data.products.length > 0) && data.products.slice(0, 4).map((item, index) => (
                        <div
                            key={index}
                            className="w-[calc(50%-8px)] md:w-[calc(33.33%-19.33px)] lg:w-[calc(25%-21.75px)] h-auto border border-[#D2D2D2] p-[14px] overflow-hidden rounded-[12px]"
                        >
                            <div className='relative md:h-[273px] h-[159.55px]  mb-[25px] cursor-pointer' onClick={() => handleNavigate(item?.productType?.category?.name, item?.productType?.category?._id, item?.productType?.name, item?.name, item?._id)}>
                                <div className='absolute top-[13px] left-0 md:w-[55px] md:h-[27px] w-[31px] h-[14px] bg-[#FF1C1C] flex items-center justify-center '>
                                    <p className='text-[9px] sm:text-xs font-bold text-white '>Sale</p>
                                </div>
                                <img src={item.thumbnailImage} alt='product' className='w-full h-full object-contain rounded-[5px] ' />
                            </div>

                            <p className='text-textBlack md:text-sm text-xs mb-[22px] break-words truncate'>{item?.name}</p>

                            <button onClick={() => handleEnquireNow(item._id)} className="w-full md:h-[45px] h-[32px] flex items-center justify-center text-white text-base bg-gradient-to-r from-[#F8710C] to-[#F22B06] transition rounded-[5px] text-[14px] sm:text-[16px] hover:from-[#FFFFFF] hover:text-[#F22B06] hover:border border-[#F22B06]">
                                Enquire Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} productId={productTobeEnquire} />}
        </div>
    )
}

export default LaunchedProducts


{/* <div className='flex justify-center'>

                        <button className="w-[216px] h-[48px] md:flex hidden justify-center items-center bg-orange-500 text-white text-base hover:bg-orange-600 transition">
                            View All
                        </button>
                    </div> */}