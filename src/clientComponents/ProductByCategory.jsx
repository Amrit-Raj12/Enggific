import React, { useEffect } from 'react'
import Loader from './Loader';
import { BASE_URL } from '@/constants';
import useFetchData from './utils/useFetchData';
import useFetchProductBySubCategoryData from './utils/useFetchProductBySubCategoryData';
import LoginPopup from './LoginPopup';
import { useState } from 'react';
import NotFound from './NotFound';
import axios from 'axios';
import { addId } from '@/redux/clientSlice/idSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProductByCategory = () => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);

  const apiUrl = `${BASE_URL}/admin/get/categories`;
  const { data: categoryData } = useFetchData(apiUrl);
  const [subCategory, setSubCategory] = useState();
  const [productTobeEnquire, setProductTobeEnquire] = useState(null);

  const navigate = useNavigate();

  // console.log("categoryData", categoryData)

  const selectedCategory = categoryData?.categories.find(category => category.name === 'MEASURING INSTRUMENT');

  // console.log("selectedCategory", selectedCategory)

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/get/productTypesByCategory`, {
          categoryId: selectedCategory?._id,
        });
        // console.log("Filters Data:", response);
        const selectedSubCategory = response.data.productTypes.find(sub => sub.name === 'Survey Instruments');
        setSubCategory(selectedSubCategory);
        // setActiveFilter(subCategoryId && subCategoryId)
        // setActiveFilter(response.data.productTypes[0]?._id || null);
        // setMainLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilters();
  }, [selectedCategory]);

  // const categoryId = categoryData

  // console.log("subCategories ---", subCategory)

  const subCategoryId = subCategory?._id;
  const { data, loading, error } = useFetchProductBySubCategoryData(subCategoryId);

  if (loading) return null;
  if (error || !data || !data.products || data.products.length === 0) return null;

  // console.log("data", data);


  const handleEnquireNow = async (id) => {

    setProductTobeEnquire(id)
    setShowLogin(true)
      
    };

  const handleLoginSuccess = async () => {
    await dispatch(clientLogin());
    setShowLogin(false); // Close popup on success
  };


  const handleNavigate = (subCategoryName, productName, productId) => {
    // console.log("ccc",categoryName, subCategoryName, productName, productId)
    dispatch(addId({ idType: "product", id: productId }));
    navigate(`/${subCategoryName.replace(/\s+/g, '-')}/${productName.replace(/\s+/g, '-').replace(/’’\/5/, '.5inch')}/${productId}
`)
}




  return (
    <div className='md:px-[60px] px-[16px]  md:pt-[60px] sm:pt-[40px] pt-[30px]'>
      <div>
        <div className="flex flex-col md:items-center md:justify-center md:text-center">
          <div className='md:mb-[40px] mb-[30px]'>
            <h3 className='md:text-2xl text-base text-textBlack'>Explore</h3>
            <div className="relative">
              <h2 className='md:text-[38px] md:leading-[43.7px] text-[25px] leading-[29.9px] font-bold bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text'>
                Our {"Survey Instruments"} Products
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:justify-center justify-between gap-[16px] md:gap-[29px]">
          {(data.products && data.products.length > 0) && data.products.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="w-[calc(50%-8px)] md:w-[calc(33.33%-19.33px)] lg:w-[calc(25%-21.75px)] h-auto border border-[#D2D2D2] p-[14px] overflow-hidden rounded-[12px]"
            >
              {console.log("rrr", item)}
              <div className='relative md:h-[273px] h-[159.55px] mb-[25px] cursor-pointer'
                onClick={() => handleNavigate(item?.productType?.name, item?.name, item?._id)}
                >
                <div className='absolute top-[13px] left-0 md:w-[55px] md:h-[27px] w-[31px] h-[14px] bg-[#FF1C1C] flex items-center justify-center '>
                  <p className='text-[9px] sm:text-xs font-bold text-white '>Sale</p>
                </div>
                <img src={item.thumbnailImage} alt='product' className='w-full h-full object-contain rounded-[5px]' />
              </div>

              <p className='text-textBlack md:text-sm text-xs mb-[22px] break-words truncate'>{item?.name}</p>

              <button onClick={() => handleEnquireNow(item._id)}
                className="w-full md:h-[45px] h-[32px] flex items-center justify-center text-white text-base bg-gradient-to-r from-[#F8710C] to-[#F22B06] transition rounded-[5px] text-[14px] sm:text-[16px] hover:from-[#FFFFFF] hover:text-[#F22B06] hover:border border-[#F22B06]">
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

export default ProductByCategory