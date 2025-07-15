import React, { useState, useEffect } from 'react'
import EquipmentCard from '../../clientComponents/EquipmentCard'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '@/constants';
import useFetchData from '@/clientComponents/utils/useFetchData';
import useFetchSubCategoryData from '@/clientComponents/utils/useFetchSubCategoryData';
import Loader from '@/clientComponents/Loader';
import NotFound from '@/clientComponents/NotFound';
import { useSelector } from 'react-redux';


const ProductSubCategories = () => {

    const apiUrl = `${BASE_URL}/get/productTypesByCategory`;
    const { categoryName } = useParams();

  const ids = useSelector((state) => state.idStore.ids);

    const categoryId = ids.find(item => item.idType === "category")?.id || null;
    
    const { data, loading, error } = categoryId ? useFetchSubCategoryData(categoryId) : { data: {}, loading: false, error: null };


    if (loading) return <Loader />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='xl:mt-[170px] mt-[100px]'>
            <div className='md:px-[60px] px-[16px]  '>
                <div className='md:mb-[40px] mb-[30px]'>
                    <h3 className='md:text-2xl text-base text-center text-textBlack'>Explore</h3>
                    <div className="relative">
                        <h2 className='md:text-[38px] md:leading-[43.7px] text-center text-[22px] leading-[28px] text-textBlack font-bold'>
                        Our Product Sub Categories</h2>
                    </div>
                </div>

                {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 md:gap-6 lg:gap-[29px] mt-[30px] sm:mt-[40px] md:mt-[60px] mb-[30px] sm:mb-[40px] md:mb-[60px] '> */}
                {/* <div className="flex transition-transform duration-500 ease-in-out mt-[30px] sm:mt-[40px] md:mt-[60px] mb-[30px] sm:mb-[40px] md:mb-[60px]"
          style={{
            transform: `translateX(0px)`,
            gap: '21px',
          }}> */}
           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[30px] gap-[16px] mt-[40px] mb-[70.07px]' style={{
            transform: `translateX(0px)`,
            gap: '21px',
          }}>
                    {(data.productTypes && data.productTypes.length > 0) ? data.productTypes.map((item, index) => (
                            <EquipmentCard
                                key={item._id}
                                index={index}
                                equipment={item}
                                page='sub-category'
                                subName={item.category.name}
                                catId={item.category._id}
                                subId={item._id}
                            />
                        )) :
                        <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
                            <NotFound />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductSubCategories

// const equipments = [
//   {
//     id: 1,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M27.2638 10.8294C28.2737 12.0972 28.1887 13.8468 27.0873 15.036C25.854 16.3676 23.8486 18.4657 20.6694 21.6449C17.4902 24.8241 15.3921 26.8296 14.0605 28.0628C12.8713 29.1642 11.1217 29.2492 9.85391 28.2394C8.77909 27.3832 7.42697 26.2318 6.08531 24.8901C4.74365 23.5485 3.59228 22.1964 2.7361 21.1216C1.72619 19.8537 1.81126 18.1042 2.91264 16.915C4.14591 15.5834 6.15134 13.4852 9.33053 10.3061C12.5097 7.12687 14.6078 5.12143 15.9395 3.88817C17.1287 2.78679 18.8782 2.70172 20.146 3.71162C21.2208 4.56781 22.573 5.71917 23.9147 7.06083C25.2563 8.40249 26.4077 9.75462 27.2638 10.8294Z" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M10.1071 14.7039L7.56812 12.1649" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M6.40163 18.4984L3.87885 15.9756" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M13.9016 10.9984L11.3196 8.41638" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M17.4338 7.15618L15.0858 4.80823" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>)],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 2,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M5.22263 17.6666V25.6662C5.22263 25.902 5.31627 26.1281 5.48297 26.2948C5.64965 26.4614 5.87573 26.5551 6.11147 26.5551H23.8884C24.1241 26.5551 24.3502 26.4614 24.517 26.2948C24.6836 26.1281 24.7772 25.902 24.7772 25.6662V17.6666" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M25.6661 13.2224H4.33382C4.09809 13.2224 3.87201 13.1288 3.70531 12.9621C3.53862 12.7954 3.44498 12.5693 3.44498 12.3336V8.77818L5.61376 4.42284C5.76284 4.12697 5.99165 3.87865 6.27433 3.70589C6.55704 3.53313 6.88239 3.44281 7.21368 3.44511H22.7863C23.1176 3.44281 23.4429 3.53313 23.7256 3.70589C24.0083 3.87865 24.237 4.12697 24.3862 4.42284L26.555 8.77818V12.3336C26.555 12.5693 26.4613 12.7954 26.2947 12.9621C26.128 13.1288 25.9019 13.2224 25.6661 13.2224Z" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M16.7776 17.6666V26.5551" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M5.22263 20.3331H16.7776" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M3.44495 8.7782H26.5549" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>)],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 3,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M18.0129 19.9928V5.93278C18.0129 5.13373 17.6954 4.36738 17.1304 3.80237C16.5654 3.23735 15.799 2.91992 15 2.91992C14.2009 2.91992 13.4346 3.23735 12.8696 3.80237C12.3046 4.36738 11.9871 5.13373 11.9871 5.93278V19.9928C11.144 20.6251 10.5212 21.5067 10.207 22.5127C9.89274 23.5186 9.90299 24.598 10.2362 25.5979C10.5695 26.5976 11.2089 27.4673 12.0639 28.0835C12.9189 28.6997 13.9461 29.0314 15 29.0314C16.0539 29.0314 17.0811 28.6997 17.9361 28.0835C18.7911 27.4673 19.4305 26.5976 19.7637 25.5979C20.097 24.598 20.1073 23.5186 19.793 22.5127C19.4788 21.5067 18.856 20.6251 18.0129 19.9928Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 4,
//     name: 'Measuring Devices',
//     icon: [(<svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M15.0043 27.007H6.97C5.8607 27.007 4.96143 26.1077 4.96143 24.9984V14.9555C4.96143 11.6276 7.65924 8.92981 10.9871 8.92981C14.315 8.92981 17.0129 11.6276 17.0129 14.9555V24.9984C17.0129 26.1077 16.1136 27.007 15.0043 27.007Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M10.9871 8.92986V4.91272" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M0.944275 12.947V8.92986C0.944275 6.71125 2.74281 4.91272 4.96142 4.91272H19.0214" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M19.0214 6.1371V3.68821C19.0214 3.22737 19.3351 2.82567 19.7821 2.71392L25.8078 1.20748C26.4417 1.04902 27.0557 1.52842 27.0557 2.18179V7.64353C27.0557 8.2969 26.4417 8.77631 25.8078 8.61783L19.7821 7.1114C19.3351 6.99965 19.0214 6.59795 19.0214 6.1371Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M17.0128 15.9598H12.9957C11.8864 15.9598 10.9871 16.8591 10.9871 17.9684V19.977C10.9871 21.0863 11.8864 21.9856 12.9957 21.9856H17.0128" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 5,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M13.8283 6.57788H16.1716C21.9954 6.57788 26.7166 11.2991 26.7166 17.1229V25.3245M15 11.2645H16.1716C19.4072 11.2645 22.03 13.8873 22.03 17.1229V25.3245" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M5.60849 25.416C5.20544 25.4271 4.81176 25.587 4.6571 25.9596C4.54872 26.2221 4.45499 26.5906 4.45499 27.0821C4.45499 27.5736 4.54872 27.9421 4.6571 28.2045C4.81176 28.5771 5.20544 28.7377 5.60849 28.7482C6.7825 28.781 9.80306 28.8396 16.1717 28.8396C22.5402 28.8396 25.5608 28.781 26.7348 28.7482C27.1379 28.7371 27.5315 28.5771 27.6862 28.2045C27.7946 27.9421 27.8883 27.5736 27.8883 27.0821C27.8883 26.5906 27.7946 26.2221 27.6862 25.9596C27.5315 25.587 27.1379 25.4265 26.7348 25.416C25.5608 25.3832 22.5402 25.3246 16.1717 25.3246C9.80306 25.3246 6.7825 25.3832 5.60849 25.416Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M8.07721 15.7872C8.12525 16.4609 8.61325 16.9753 9.28578 17.0362C9.80717 17.083 10.5307 17.1229 11.485 17.1229C12.4399 17.1229 13.1628 17.083 13.6842 17.0362C14.3568 16.9753 14.8448 16.4603 14.8928 15.7872C14.9467 15.0168 15 13.7719 15 11.8504C15 9.92885 14.9473 8.68395 14.8928 7.91358C14.8448 7.23987 14.3568 6.72551 13.6842 6.66458C13.1628 6.61772 12.4399 6.57788 11.485 6.57788C10.5301 6.57788 9.80717 6.61772 9.28578 6.66458C8.61325 6.72551 8.12525 7.24046 8.07721 7.91358C8.02331 8.68395 7.97 9.92885 7.97 11.8504C7.97 13.7719 8.02273 15.0168 8.07721 15.7872Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M13.819 6.68332C13.8112 5.90345 13.7897 5.12378 13.7545 4.34467C13.7235 3.70142 13.2952 3.17828 12.6543 3.11501C12.3438 3.08454 11.9572 3.06287 11.485 3.06287C11.0134 3.06287 10.6262 3.08454 10.3163 3.11559C9.67477 3.17828 9.24711 3.70142 9.21547 4.34467C9.19028 4.86958 9.16509 5.62589 9.15103 6.68332" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M22.03 21.8096H6.79831" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 6,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M27.8741 9.11488C27.8354 8.9044 27.7528 8.70443 27.6317 8.52794C27.5106 8.35146 27.3537 8.20243 27.1711 8.09051L23.154 12.1077C22.9666 12.302 22.742 12.4567 22.4936 12.5623C22.2451 12.6679 21.9778 12.7223 21.7078 12.7223C21.4379 12.7223 21.1707 12.6679 20.9222 12.5623C20.6737 12.4567 20.4491 12.302 20.2617 12.1077L18.7352 10.7418C18.3672 10.3664 18.161 9.86157 18.161 9.33582C18.161 8.81008 18.3672 8.30529 18.7352 7.92983L22.7523 3.91268C22.6647 3.70688 22.5329 3.52284 22.3664 3.37359C22.1997 3.22435 22.0025 3.11353 21.7882 3.049C20.3866 2.76949 18.9346 2.88913 17.5977 3.39432C16.2607 3.8995 15.0924 4.76992 14.2259 5.90649C13.3593 7.04306 12.8293 8.40011 12.6961 9.82312C12.5714 11.1561 12.7997 12.4969 13.3556 13.7113L2.57623 24.4906C1.7805 25.2864 1.79369 26.5806 2.60549 27.3599L3.73186 28.4413C4.51749 29.1955 5.7611 29.1863 6.53538 28.4202L17.4386 17.6352C18.6178 18.1222 19.9024 18.3074 21.1754 18.171C22.5828 18.0201 23.9209 17.4818 25.0406 16.6159C26.1606 15.75 27.0183 14.5904 27.5184 13.2662C28.0188 11.9419 28.1419 10.5049 27.8741 9.11488Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 7,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M27.2638 10.8294C28.2737 12.0972 28.1887 13.8468 27.0873 15.036C25.854 16.3676 23.8486 18.4657 20.6694 21.6449C17.4902 24.8241 15.3921 26.8296 14.0605 28.0628C12.8713 29.1642 11.1217 29.2492 9.85391 28.2394C8.77909 27.3832 7.42697 26.2318 6.08531 24.8901C4.74365 23.5485 3.59228 22.1964 2.7361 21.1216C1.72619 19.8537 1.81126 18.1042 2.91264 16.915C4.14591 15.5834 6.15134 13.4852 9.33053 10.3061C12.5097 7.12687 14.6078 5.12143 15.9395 3.88817C17.1287 2.78679 18.8782 2.70172 20.146 3.71162C21.2208 4.56781 22.573 5.71917 23.9147 7.06083C25.2563 8.40249 26.4077 9.75462 27.2638 10.8294Z" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M10.1071 14.7039L7.56812 12.1649" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M6.40163 18.4984L3.87885 15.9756" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M13.9016 10.9984L11.3196 8.41638" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M17.4338 7.15618L15.0858 4.80823" stroke="#E5810C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>)],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 8,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M5.22263 17.6666V25.6662C5.22263 25.902 5.31627 26.1281 5.48297 26.2948C5.64965 26.4614 5.87573 26.5551 6.11147 26.5551H23.8884C24.1241 26.5551 24.3502 26.4614 24.517 26.2948C24.6836 26.1281 24.7772 25.902 24.7772 25.6662V17.6666" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M25.6661 13.2224H4.33382C4.09809 13.2224 3.87201 13.1288 3.70531 12.9621C3.53862 12.7954 3.44498 12.5693 3.44498 12.3336V8.77818L5.61376 4.42284C5.76284 4.12697 5.99165 3.87865 6.27433 3.70589C6.55704 3.53313 6.88239 3.44281 7.21368 3.44511H22.7863C23.1176 3.44281 23.4429 3.53313 23.7256 3.70589C24.0083 3.87865 24.237 4.12697 24.3862 4.42284L26.555 8.77818V12.3336C26.555 12.5693 26.4613 12.7954 26.2947 12.9621C26.128 13.1288 25.9019 13.2224 25.6661 13.2224Z" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M16.7776 17.6666V26.5551" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M5.22263 20.3331H16.7776" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M3.44495 8.7782H26.5549" stroke="#E5810C" strokeWidth="1.6639" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>)],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 9,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M18.0129 19.9928V5.93278C18.0129 5.13373 17.6954 4.36738 17.1304 3.80237C16.5654 3.23735 15.799 2.91992 15 2.91992C14.2009 2.91992 13.4346 3.23735 12.8696 3.80237C12.3046 4.36738 11.9871 5.13373 11.9871 5.93278V19.9928C11.144 20.6251 10.5212 21.5067 10.207 22.5127C9.89274 23.5186 9.90299 24.598 10.2362 25.5979C10.5695 26.5976 11.2089 27.4673 12.0639 28.0835C12.9189 28.6997 13.9461 29.0314 15 29.0314C16.0539 29.0314 17.0811 28.6997 17.9361 28.0835C18.7911 27.4673 19.4305 26.5976 19.7637 25.5979C20.097 24.598 20.1073 23.5186 19.793 22.5127C19.4788 21.5067 18.856 20.6251 18.0129 19.9928Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 10,
//     name: 'Measuring Devices',
//     icon: [(<svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M15.0043 27.007H6.97C5.8607 27.007 4.96143 26.1077 4.96143 24.9984V14.9555C4.96143 11.6276 7.65924 8.92981 10.9871 8.92981C14.315 8.92981 17.0129 11.6276 17.0129 14.9555V24.9984C17.0129 26.1077 16.1136 27.007 15.0043 27.007Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M10.9871 8.92986V4.91272" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M0.944275 12.947V8.92986C0.944275 6.71125 2.74281 4.91272 4.96142 4.91272H19.0214" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M19.0214 6.1371V3.68821C19.0214 3.22737 19.3351 2.82567 19.7821 2.71392L25.8078 1.20748C26.4417 1.04902 27.0557 1.52842 27.0557 2.18179V7.64353C27.0557 8.2969 26.4417 8.77631 25.8078 8.61783L19.7821 7.1114C19.3351 6.99965 19.0214 6.59795 19.0214 6.1371Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M17.0128 15.9598H12.9957C11.8864 15.9598 10.9871 16.8591 10.9871 17.9684V19.977C10.9871 21.0863 11.8864 21.9856 12.9957 21.9856H17.0128" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 11,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M13.8283 6.57788H16.1716C21.9954 6.57788 26.7166 11.2991 26.7166 17.1229V25.3245M15 11.2645H16.1716C19.4072 11.2645 22.03 13.8873 22.03 17.1229V25.3245" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M5.60849 25.416C5.20544 25.4271 4.81176 25.587 4.6571 25.9596C4.54872 26.2221 4.45499 26.5906 4.45499 27.0821C4.45499 27.5736 4.54872 27.9421 4.6571 28.2045C4.81176 28.5771 5.20544 28.7377 5.60849 28.7482C6.7825 28.781 9.80306 28.8396 16.1717 28.8396C22.5402 28.8396 25.5608 28.781 26.7348 28.7482C27.1379 28.7371 27.5315 28.5771 27.6862 28.2045C27.7946 27.9421 27.8883 27.5736 27.8883 27.0821C27.8883 26.5906 27.7946 26.2221 27.6862 25.9596C27.5315 25.587 27.1379 25.4265 26.7348 25.416C25.5608 25.3832 22.5402 25.3246 16.1717 25.3246C9.80306 25.3246 6.7825 25.3832 5.60849 25.416Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M8.07721 15.7872C8.12525 16.4609 8.61325 16.9753 9.28578 17.0362C9.80717 17.083 10.5307 17.1229 11.485 17.1229C12.4399 17.1229 13.1628 17.083 13.6842 17.0362C14.3568 16.9753 14.8448 16.4603 14.8928 15.7872C14.9467 15.0168 15 13.7719 15 11.8504C15 9.92885 14.9473 8.68395 14.8928 7.91358C14.8448 7.23987 14.3568 6.72551 13.6842 6.66458C13.1628 6.61772 12.4399 6.57788 11.485 6.57788C10.5301 6.57788 9.80717 6.61772 9.28578 6.66458C8.61325 6.72551 8.12525 7.24046 8.07721 7.91358C8.02331 8.68395 7.97 9.92885 7.97 11.8504C7.97 13.7719 8.02273 15.0168 8.07721 15.7872Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M13.819 6.68332C13.8112 5.90345 13.7897 5.12378 13.7545 4.34467C13.7235 3.70142 13.2952 3.17828 12.6543 3.11501C12.3438 3.08454 11.9572 3.06287 11.485 3.06287C11.0134 3.06287 10.6262 3.08454 10.3163 3.11559C9.67477 3.17828 9.24711 3.70142 9.21547 4.34467C9.19028 4.86958 9.16509 5.62589 9.15103 6.68332" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M22.03 21.8096H6.79831" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   },
//   {
//     id: 12,
//     name: 'Measuring Devices',
//     icon: [(<svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M27.8741 9.11488C27.8354 8.9044 27.7528 8.70443 27.6317 8.52794C27.5106 8.35146 27.3537 8.20243 27.1711 8.09051L23.154 12.1077C22.9666 12.302 22.742 12.4567 22.4936 12.5623C22.2451 12.6679 21.9778 12.7223 21.7078 12.7223C21.4379 12.7223 21.1707 12.6679 20.9222 12.5623C20.6737 12.4567 20.4491 12.302 20.2617 12.1077L18.7352 10.7418C18.3672 10.3664 18.161 9.86157 18.161 9.33582C18.161 8.81008 18.3672 8.30529 18.7352 7.92983L22.7523 3.91268C22.6647 3.70688 22.5329 3.52284 22.3664 3.37359C22.1997 3.22435 22.0025 3.11353 21.7882 3.049C20.3866 2.76949 18.9346 2.88913 17.5977 3.39432C16.2607 3.8995 15.0924 4.76992 14.2259 5.90649C13.3593 7.04306 12.8293 8.40011 12.6961 9.82312C12.5714 11.1561 12.7997 12.4969 13.3556 13.7113L2.57623 24.4906C1.7805 25.2864 1.79369 26.5806 2.60549 27.3599L3.73186 28.4413C4.51749 29.1955 5.7611 29.1863 6.53538 28.4202L17.4386 17.6352C18.6178 18.1222 19.9024 18.3074 21.1754 18.171C22.5828 18.0201 23.9209 17.4818 25.0406 16.6159C26.1606 15.75 27.0183 14.5904 27.5184 13.2662C28.0188 11.9419 28.1419 10.5049 27.8741 9.11488Z" stroke="#E5810C" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>

//     )],
//     image: 'equipment-1.png'
//   }

// ]
