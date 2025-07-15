import Loader from '@/clientComponents/Loader';
import LoginPopup from '@/clientComponents/LoginPopup';
import MobileFilters from '@/clientComponents/MobileFilters';
import NotFound from '@/clientComponents/NotFound';
import useFetchData from '@/clientComponents/utils/useFetchData';
import useFetchProductBySubCategoryData from '@/clientComponents/utils/useFetchProductBySubCategoryData';
import { BASE_URL } from '@/constants';
import { clientLogin } from '@/redux/clientSlice/clientAuthSlice';
import { addId } from '@/redux/clientSlice/idSlice';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const { categoryId, subCategoryId } = useParams();


  const [activeFilter, setActiveFilter] = useState(subCategoryId);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.clientAuth);
  const [showLogin, setShowLogin] = useState(false);

  const [filters, setFilters] = useState([])
  const [isOpen, setIsOpen] = useState(false);

  const [productTobeEnquire, setProductTobeEnquire] = useState(null);

  const ids = useSelector((state) => state.idStore.ids);

  const [mainLoading, setMainLoading] = useState(true);

  // console.log("ids", ids)

  // const subCategoryId = ids.find(item => item.idType === "sub-category")?.id;

  // console.log("subCategoryId", subCategoryId)

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/get/productTypesByCategory`, {
          categoryId: categoryId,
        });
        // console.log("Filters Data:", response);
        setFilters(response.data.productTypes);
        // setActiveFilter(subCategoryId && subCategoryId)
        // setActiveFilter(response.data.productTypes[0]?._id || null);
        setMainLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilters();
  }, [ids, subCategoryId]);

  // useEffect(() => {
  //   setActiveFilter(subCategoryId)
  // }, [subCategoryId])

  // console.log("activeFilter",activeFilter)


  const navigate = useNavigate()


  const handleNavigate = (categoryName, subCategoryName, productName, productId) => {
    dispatch(addId({ idType: "product", id: productId }));
    navigate(`/${subCategoryName.replace(/\s+/g, '-')}/${productName.replace(/\s+/g, '-').replace(/’’\/5/, '.5inch')}/${productId}
`)

  }

  const handleProductListNavigate = (categoryName, categoryId, subCategoryName, subCategoryId) => {
    navigate(`/${categoryName.replace(/\s+/g, '-')}/${categoryId}/${subCategoryName.replace(/\s+/g, '-')}/${subCategoryId}`)
  }


  const { data, loading, error } = useFetchProductBySubCategoryData(activeFilter);

  // const apiUrl = `${BASE_URL}/user/get/products`;


  // const { data, loading, error } = useFetchData(apiUrl);



  // console.log("subCategoryId", subCategoryId)

  //   console.log("apiUrl", apiUrl)

  //   const { data, loading, error } = useFetchSubCategoryData(categoryId);

  if (mainLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  // console.log("product by sub", data)

  const handleEnquireNow = async (id) => {

    setProductTobeEnquire(id)
    setShowLogin(true)
    // if (user && token) {
    //   // User authenticated, make the post request
    //   try {
    //     const response = await axios.post(
    //       `${BASE_URL}/user/create/enquiry`,
    //       { productIds: [id] },
    //       { headers: { Authorization: `Bearer ${token}` } }
    //     );

    //     toast.success("Enquiry succesfull team will contact soon", { autoClose: 3000 });
    //     // console.log("Enquiry successful", response.data);
    //   } catch (error) {
    //     toast.error("Enquiry failed");
    //     console.error("Enquiry failed", error);
    //   }
    // } else {
    //   // User is not authenticated, show login popup
    //   setShowLogin(true);
    // }
  };

  const handleLoginSuccess = async () => {
    await dispatch(clientLogin());
    setShowLogin(false); // Close popup on success
  };




  // const filteredProducts = (data.products && data.products.length > 0) ? data.products.filter(product =>
  //   activeFilter && activeFilter.length > 0
  //     ? activeFilter.includes(product.productType?._id || "")
  //     : true
  // ) : [];


  return (
    <section className='xl:mt-[170px] mt-[100px]'>
      <div className="mx-auto max-w-full px-4 py-[29px] sm:px-6 sm:py-12 lg:px-[60px]">
        <header className='max-w-[556px]'>
          <h2 className="xl:text-[34px] text-[26px] text-textBlack font-bold sm:text-3xl">{filters[0]?.category?.name}</h2>
        </header>

        <div className="mt-8 block lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 rtl:rotate-180"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-2">
          <div className="hidden space-y-4 lg:block h-[500px] overflow-y-auto custom-scrollbar overflow-x-hidden">
            <div>
              <p className="block text-lg font-bold text-textBlack px-[11px] mb-[17px]">
                Sub Category
              </p>
              <div className="space-y-2">
                {filters?.length > 0 &&
                  filters.map((filter) => (
                    <div
                      key={filter._id}
                      className={`w-[265px] h-[49px] px-[11px] flex items-center cursor-pointer rounded-md
              ${activeFilter === filter._id
                          ? 'bg-[#FCF1E4] text-[#E5810C]'
                          : 'text-textBlack'
                        }
              hover:bg-[#FCF1E4] hover:text-[#E5810C] transition duration-300`}
                      onClick={() => {
                        setActiveFilter(filter._id)
                        handleProductListNavigate(filter?.category?.name, filter?.category?._id, filter?.name, filter?._id)
                        // {console.log("filterss", filter)}
                      }}
                    >
                      
                      <p className="text-base">{filter.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>


          {isOpen && <MobileFilters filters={filters} isOpen={isOpen} setIsOpen={setIsOpen} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}

          <div className='lg:col-span-3'>
            {/* Sorting */}
            {/* <div className='flex items-center mb-[31px] gap-[13px]'>
                            <label htmlFor="SortBy" className="block text-lg font-bold text-textBlack"> Sort By </label>

                            <select id="SortBy" className="mt-1 w-[155px] h-[38px] border border-[#D2D2D2] focus:border-[#E5810C] focus:outline-none text-sm">
                                <option>Sort By</option>
                                <option value="Price, DESC">Price</option>
                                <option value="Price, ASC">Price</option>
                                <option value="Title, DESC">Title</option>
                                <option value="Title, ASC">Title</option>
                            </select>
                        </div> */}
            <div className={`flex flex-wrap gap-[29px] ${data?.products && data?.products?.length <=1 ? "h-[420px]" : "h-[720px] overflow-y-auto"} no-scrollbar`}>
              {loading ? <div className='flex items-center justify-center w-full h-full'>
                <Loader />
              </div> : (data?.products && data?.products.length > 0) ? data?.products?.map((item, index) => (
                <div
                  key={index}
                  className="w-[calc(50%-14.5px)] xl:w-[calc(32.73%-19.33px)] md:h-fit  border border-[#D2D2D2] p-[14px] cursor-pointer overflow-hidden rounded-[12px]"
                >
                  {console.log("item", item)}
                  <div className='relative md:h-[273px] h-[159.55px] mb-[12px]' onClick={() => handleNavigate(item?.productType?.category?.name, item?.productType?.name, item?.name, item?._id)}>
                    <div className='absolute top-0 left-0 md:w-[55px] md:h-[27px] w-[32.14px] h-[15.78px] bg-[#FF1C1C] flex items-center justify-center'>
                      <p className='text-xs font-bold text-white'>Sale</p>
                    </div>
                    <img src={item.thumbnailImage} alt='product' className='w-full h-full object-contain rounded-[5px] ' />
                  </div>

                  <p className='text-textBlack md:text-sm text-xs mb-[22px] break-words'>{item.name}</p>

                  <button onClick={() => handleEnquireNow(item._id)} className="w-full md:h-[45px] h-[32px] flex items-center justify-center bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-white text-base hover:from-[#FFFFFF] hover:text-[#F22B06] hover:border border-[#F22B06] transition rounded-[5px]">
                    Enquire Now
                  </button>
                </div>
              )) : <NotFound />}
            </div>

          </div>


        </div>
      </div>
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} productId={productTobeEnquire} />}
    </section>
  )
}

export default ProductList