import Loader from '@/clientComponents/Loader';
import LoginPopup from '@/clientComponents/LoginPopup';
import MagniFyingImage from '@/clientComponents/MagniFyingImage';
import NotFound from '@/clientComponents/NotFound';
import useFetchData from '@/clientComponents/utils/useFetchData';
import { BASE_URL } from '@/constants';
import { clientLogin } from '@/redux/clientSlice/clientAuthSlice';
import { addId } from '@/redux/clientSlice/idSlice';
import { setFixed, setRelative } from '@/redux/clientSlice/positionSlice';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const {productId} = useParams();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);

    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.clientAuth);
    const [showLogin, setShowLogin] = useState(false);
    const [productTobeEnquire, setProductTobeEnquire] = useState(null);

    const ids = useSelector((state) => state.idStore.ids);

    // console.log("ids", ids)

    // const productId = ids.find(item => item.idType === "product")?.id;

    const apiUrl = `${BASE_URL}/user/get/product/${productId}`;
    const { data, loading, error } = useFetchData(apiUrl);


    useEffect(() => {
        dispatch(setRelative()); // Set to 'relative' when visiting this page
    
        return () => {
          dispatch(setFixed()); // Set to 'fixed' when leaving this page
        };
      }, [dispatch]);

    useEffect(() => {
        if (data?.product?.productImages?.length) {
            setSelectedImage(data.product.productImages[0].url);
        }
    }, [data]);

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    const handleEnquireNow = async (id) => {
        setProductTobeEnquire(id)
        setShowLogin(true)
    };

    const handleLoginSuccess = async () => {
        await dispatch(clientLogin());
        setShowLogin(false); // Close popup on success
    };

    const handleRedirect = (categoryName, subCategoryName, productName, productId) => {
        dispatch(addId({ idType: "product", id: productId }));
        navigate(`/${subCategoryName.replace(/\s+/g, '-')}/${productName.replace(/\s+/g, '-').replace(/\//g, '|')}/${productId}`)
    }

    return (
        <div className='md:px-[60px] px-[16px]  mt-0 mb-[30px] sm:mb-[40px] md:mb-[60px]'>
            {/* Restructured layout for md and above */}
            <div className="md:flex items-start">
                {/* Sticky image container with fixed width for md and above */}
                <div className="hidden  md:block md:sticky md:top-[100px] md:h-fit md:w-[400px] xl:w-[550px] flex-shrink-0">
                    <div className="flex flex-col xl:flex-row gap-2 md:gap-4">
                        <img
                            src={selectedImage}
                            alt="product"
                            className="xl:w-[414.31px] w-full h-[350px] xl:h-[414.31px] object-contain border-2 border-gray-300 rounded-[5px]"
                        />

                        {/* Thumbnail Images */}
                        <div className="flex xl:flex-col flex-row gap-2 xl:gap-3 overflow-x-auto custom-scrollbar ">
                            {data.product?.productImages.map((img) => (
                                <img
                                    key={img._id}
                                    className={`w-full h-[88px] xl:w-[94.88px] xl:h-[94.88px] cursor-pointer object-contain border-2 rounded-[5px] ${selectedImage === img.url ? "border-[#E5810C]" : "border-gray-300"
                                        }`}
                                    alt="product"
                                    src={img.url}
                                    onClick={() => setSelectedImage(img.url)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scrollable content container with product details and related products */}
                <div className="w-full lg:ml-8 md:ml-6 ml-0 md:mt-0 mt-6 flex-grow">
                    {/* Mobile view images (non-sticky) */}
                    <div className="md:hidden flex flex-col gap-2 mb-6">
                        <img
                            src={selectedImage}
                            alt="product"
                            className="w-full h-[250px] sm:h-[300px] object-contain border-2 border-gray-300 rounded-[5px]"
                        />

                        {/* Thumbnail Images */}
                        <div className="flex flex-row gap-2 overflow-x-auto 450:justify-start justify-center custom-scrollbar">
                            {data.product?.productImages.map((img) => (
                                <img
                                    key={img._id}
                                    className={`w-[58.04px] h-[58.04px] sm:w-[70px] sm:h-[70px] cursor-pointer border-2 rounded ${selectedImage === img.url ? "border-[#E5810C]" : "border-gray-300"
                                        }`}
                                    alt="product"
                                    src={img.url}
                                    onClick={() => setSelectedImage(img.url)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <div className="mb-[20px] ">
                            <p className="text-2xl font-bold text-textBlack">{data.product && data.product.name}</p>
                        </div>

                        <div className='mb-[20px]'>
                            <p className='text-base text-[#747474] font-bold'>BRAND: {data.product && data.product.sku}</p>
                        </div>

                        <div className='bg-[#F5FFF1] flex justify-center items-center gap-[3px] w-[134px] h-[45px] text-[#51C86B] border border-[#51C86B] mb-[20px] rounded-[5px]'>
                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.4934 5.97752L12.6735 1.1486C12.2543 0.9171 11.7456 0.9171 11.3264 1.1486L2.50651 5.97752C2.05699 6.22347 1.77729 6.69489 1.77686 7.20729V16.7929C1.77729 17.3053 2.05699 17.7768 2.50651 18.0227L11.3264 22.8516C11.7457 23.0828 12.2542 23.0828 12.6735 22.8516L21.4934 18.0227C21.9429 17.7768 22.2226 17.3053 22.223 16.7929V7.20729C22.2226 6.69489 21.9429 6.22346 21.4934 5.97752ZM11.8997 2.20298C11.9597 2.17018 12.0322 2.17018 12.0922 2.20298L20.4701 6.78834L17.0684 8.64955L8.59727 4.01307L11.8997 2.20298ZM11.3986 21.5216L3.0798 16.9683C3.01722 16.9322 2.97893 16.8652 2.97957 16.7929V7.85676L11.3986 12.4672V21.5216ZM3.52982 6.78834L7.34544 4.69862L15.8156 9.3351L12 11.4228L3.52982 6.78834ZM21.0203 16.7929C21.021 16.8652 20.9827 16.9322 20.9201 16.9683L12.6013 21.5216V12.4652L16.2095 10.4897V14.4056C16.2095 14.8685 16.7106 15.1578 17.1115 14.9263C17.2976 14.8189 17.4122 14.6204 17.4122 14.4056V9.83222L21.0203 7.85676V16.7929Z" fill="#51C86B" />
                            </svg>
                            {data.product.status === 'available' ? "In Stock" : "Out of Stock"}
                        </div>

                        <div className='border border-[#D2D2D2] px-[17px] py-[20px] mb-[20px] rounded-[5px]'>
                            <div>
                                {data.product && data.product.composition ? (
                                    <div
                                        className="text-base text-textBlack"
                                        dangerouslySetInnerHTML={{ __html: data.product.composition }}
                                    />
                                ) : (
                                    <p className="text-base text-textBlack">No composition available</p>
                                )}
                            </div>
                        </div>

                        <button onClick={() => handleEnquireNow(data.product._id)} className="bg-gradient-to-r from-[#F8710C] to-[#F22B06] rounded-[5px] h-[38px] sm:h-[45px] px-[10px] sm:px-[18px] text-white text-center mt-[16px] sm:mt-[22px] sm:text-[15.25] text-[14px]">
                            Enquire Now
                        </button>
                    </div>
                </div>


            </div>
            {/* Divider - now inside the scrollable container */}
            <div className='bg-[#D2D2D2] h-[1px] w-full my-[30px] sm:my-[40px] md:my-[60px]' />

            {/* Related Products - now inside the scrollable container */}
            <div>
                <div className='text-center mb-[30px]  sm:mb-[40px] md:mb-[60px]'>
                    <h2 className='md:text-[38px] text-[26px] text-textBlack font-bold'>Related products</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[8px] sm:gap-[29px] justify-center">
                    {(data.relatedProducts && data.relatedProducts.length > 0) && data.relatedProducts?.map((item) => (
                        <div
                            key={item._id}
                            className="w-full rounded-[5px] border border-[#D2D2D2] px-[14px] py-[18px]"
                            onClick={() => handleRedirect(item.productType.category.name, item.productType.name, item.name, item._id )}
                        >
                            <div className='relative md:h-[273px] h-[159.55px] mb-[10px] sm:mb-[25px] cursor-pointer'>
                                <div className='absolute top-[13px] left-0 md:w-[55px] md:h-[27px] w-[31px] h-[14px] bg-[#FF1C1C] flex items-center justify-center'>
                                    <p className='text-[9px] sm:text-xs font-bold text-white'>Sale</p>
                                </div>
                                <img src={item?.thumbnailImage} alt='product' className='w-full h-full object-contain rounded-[5px]' />
                            </div>

                            <p className='text-textBlack md:text-sm text-xs mb-[10px] sm:mb-[22px] truncate'>{item?.name}</p>

                            <button onClick={() => handleEnquireNow(item._id)} className="w-full md:h-[45px] h-[32px] flex items-center justify-center rounded-[5px] bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-white text-base transition">
                                Enquire Now
                            </button>
                        </div>
                    ))}
                </div>
                {(data.relatedProducts && data.relatedProducts.length === 0) && <NotFound />}
            </div>
            {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} productId={productTobeEnquire} />}
        </div>
    );
}

export default ProductDetail

{/* <div className='border border-[#D2D2D2] pl-[17px] pt-[30px] pb-[29px] mb-[20px] mt-[50px]'>
                        <div>
                            {data.product && data.product.composition ? (
                                <div
                                    className="text-base text-textBlack"
                                    dangerouslySetInnerHTML={{ __html: data.product.composition }}
                                />
                            ) : (
                                <p className="text-base text-textBlack">No composition available</p>
                            )}
                        </div>
                    </div> */}


{/* <div className='border border-[#D2D2D2] pl-[17px] pt-[30px] pb-[29px] mb-[20px]'>
                        <div>
                            {data.product && data.product.composition ? (
                                <div
                                    className="text-base text-textBlack"
                                    dangerouslySetInnerHTML={{ __html: data.product.composition.length > 200 ? `${data.product.composition.substring(0, 200)}...` : data.product.composition }}
                                />
                            ) : (
                                <p className="text-base text-textBlack">No composition available</p>
                            )}
                        </div>
                    </div> */}