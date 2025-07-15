import Loader from '@/clientComponents/Loader';
import LoginPopup from '@/clientComponents/LoginPopup';
import NotFound from '@/clientComponents/NotFound';
import useFetchData from '@/clientComponents/utils/useFetchData';
import useQuery from '@/clientComponents/utils/useQuery';
import { BASE_URL } from '@/constants';
import { clientLogin } from '@/redux/clientSlice/clientAuthSlice';
import { addId } from '@/redux/clientSlice/idSlice';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchedProduct = () => {
    const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.clientAuth);
  const [showLogin, setShowLogin] = useState(false);
  const [productTobeEnquire, setProductTobeEnquire] = useState(null);

  const navigate = useNavigate()

//   console.log('searchTerm', searchTerm)

   // const { data, loading, error } = useFetchProductBySubCategoryData(subCategoryId);
   const apiUrl = `${BASE_URL}/user/get/products`;

   const { data, loading, error } = useFetchData(apiUrl);

//    console.log('data from searched product', data)

if (loading) return <Loader />;
if (error) return <p>Error: {error.message}</p>;


   const filteredProducts = (data.products && data.products.length > 0) 
  ? data.products.filter(product =>
      (searchTerm && searchTerm.length > 0 
        ? (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           product.productType.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : true)
    ) 
  : [];


  const handleEnquireNow = async (id) => {

    setProductTobeEnquire(id)
    setShowLogin(true)
      
    };

  const handleLoginSuccess = async () => {
    await dispatch(clientLogin());
    setShowLogin(false); // Close popup on success
  };

  const handleNavigate = (categoryName, subCategoryName, productName, productId) => {
    dispatch(addId({ idType:"product", id: productId }));
    navigate(`/${subCategoryName.replace(/\s+/g, '-')}/${productName.replace(/\s+/g, '-').replace(/’’\/5/, '.5inch')}/${productId}
`)
    
}


//   const filteredProducts = allProducts.filter((product) =>
//     product.toLowerCase().includes(searchTerm)
//   );
  return (
    <div className='xl:px-[60px] px-[16px] xl:mt-[170px] mt-[100px]'>
        <div className='mb-[70px]'>
                <h2 className='md:text-[38px] text-[26px] text-textBlack'>We found the following for <span className='font-bold'>{searchTerm}</span></h2>
        </div>

        {/* searched List */}
        <div className="flex flex-wrap justify-center gap-[29px] xl:mb-[70px] mb-[30px]">
                    {(filteredProducts && filteredProducts.length > 0) ? filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="w-[calc(50%-14.5px)] xs1400:w-[calc(32.73%-19.33px)] md:h-auto h-[282px]  border border-[#D2D2D2] p-[14px] overflow-hidden rounded-[12px]"
                        >
                            

                            <div className='relative md:h-[273px] h-[159.55px] mb-[12px] cursor-pointer' onClick={()=>handleNavigate(product?.productType?.category?.name, product?.productType?.name, product?.name, product?._id)}>
                            <div className='absolute top-[13px] left-0 md:w-[55px] md:h-[27px] w-[31px] h-[14px] bg-[#FF1C1C] flex items-center justify-center '>
                                    <p className='text-[9px] sm:text-xs font-bold text-white '>Sale</p>
                                </div>
                                <img src={product.thumbnailImage} alt='product' className='w-full h-full object-contain rounded-[5px]' />
                            </div>

                            <p className='text-textBlack md:text-sm text-xs mb-[22px] break-words'>{product.name}</p>

                            <button onClick={()=>handleEnquireNow(product._id)} className="w-full md:h-[45px] h-[32px] flex items-center justify-center bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-white text-base hover:from-[#FFFFFF] hover:text-[#F22B06] hover:border border-[#F22B06] transition rounded-[5px]">
                                Enquire Now
                            </button>
                        </div>
                    )): <NotFound />}
                </div>
                {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} productId={productTobeEnquire} />}
    </div>
  )
}

export default SearchedProduct