import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminOptionsNavbar from "@/adminComponents/AdminOptionsNavbar";
import { getAllBanners, deleteBanner } from "@/redux/bannerSlice";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import NoData from "@/adminComponents/NoData";
import MainLoader from "@/adminComponents/MainLoader";
import { deleteBrand, getAllBrands } from "@/redux/brandSlice";
import { useNavigate } from "react-router-dom";

const AdminOptions = () => {
    const dispatch = useDispatch();
    const { banners } = useSelector((state) => state.bannerList);
    const { brands } = useSelector((state) => state.brandList);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentBrandSlide, setCurrentBrandSlide] = useState(0);
    const [deletingId, setDeletingId] = useState(null);
    const [deletingBrandId, setDeletingBrandId] = useState(null);
    const [bannersLoading, setBannersLoading] = useState(false);
    const [brandsLoading, setBrandsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const loadBanners = async () => {
            if (bannersLoading) return; // Prevent multiple calls
            setBannersLoading(true); // Set loading to true before fetching
    
            try {
                await dispatch(getAllBanners());
            } catch (error) {
                console.error("Failed to fetch enquiries:", error);
                // Optionally, you can set an error state here
            } finally {
                setBannersLoading(false); // Always set loading to false after fetching
            }
        };
        
        loadBanners();
    }, [dispatch]);

    useEffect(() => {
        const loadBrands = async () => {
            if (brandsLoading) return; // Prevent multiple calls
            setBrandsLoading(true); // Set loading to true before fetching
    
            try {
                await dispatch(getAllBrands());
            } catch (error) {
                console.error("Failed to fetch enquiries:", error);
                // Optionally, you can set an error state here
            } finally {
                setBrandsLoading(false); // Always set loading to false after fetching
            }
        };
        
        loadBrands();
    }, [dispatch, brandsLoading]);


    if (bannersLoading) {
        return (
            <MainLoader />
        );
    }

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await dispatch(deleteBanner(id)).unwrap();
            // Ensure currentSlide is updated correctly after deletion
            console.log("Current slide before deletion:", currentSlide, banners.length - 1);
            if (currentSlide >= banners.length - 1) {
                setCurrentSlide(Math.max(0, banners.length - 2));
            }
            toast.success("Banner deleted successfully");
        } catch (error) {
            const errorMessage = error?.error || error?.message || "Failed to delete banner";
            toast.error(errorMessage);
        } finally {
            setDeletingId(null);
        }
    };

    const handleBrandDelete = async (id) => {
        setDeletingBrandId(id);
        try {
            await dispatch(deleteBrand(id)).unwrap();
            // navigate(0)
            // Ensure currentSlide is updated correctly after deletion
            setBrandsLoading(true)
            console.log("currentBrandSlide", currentBrandSlide, brands)
            if (currentBrandSlide >= brands[0].brandImages.length - 1) {
                console.log("inside if")
                setCurrentBrandSlide(Math.max(0, brands[0].brandImages.length - 2));
            }
            setBrandsLoading(false)
            toast.success("Brand deleted successfully");
        } catch (error) {
            const errorMessage = error?.error || error?.message || "Failed to delete brand";
            toast.error(errorMessage);
        } finally {
            setBrandsLoading(false);
            setDeletingBrandId(null);
        }
    };


    console.log("Brands", brands)

    return (
        <div className="container mx-auto px-4">
            <AdminOptionsNavbar />
            {banners && banners.length > 0 ? (
                <div>
                    <h1 className="text-2xl font-bold my-6">Banner Images</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {banners && banners?.map((banner, index) => (
                            <div key={banner._id} className="relative">
                                <div className="mb-2 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Banner {index + 1}</span>
                                    <button
                                        onClick={() => handleDelete(banner._id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete banner"
                                    >
                                        {deletingId === banner._id ? (
                                            <Loader2 className="animate-spin" w-4 h-4 />
                                        ) : (
                                            <Trash2 size={20} />
                                        )}
                                    </button>
                                </div>
                                <img
                                    src={banner?.bannerImage}
                                    alt={`Banner ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
                    <NoData name="Banners" />
                </div>
            )}

            {/* Brands */}
            {(brands && brands.length > 0 && brands[0].brandImages.length > 0) ? (
                <div>
                    <h1 className="text-2xl font-bold my-6">Brand Images</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {brands && brands[0].brandImages?.map((brand, index) => (
                            <div key={brand._id} className="relative">
                                <div className="mb-2 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Brand {index + 1}</span>
                                    <button
                                        onClick={() => handleBrandDelete(brand._id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete brand"
                                    >
                                        {deletingBrandId === brand._id ? (
                                            <Loader2 className="animate-spin" w-4 h-4 />
                                        ) : (
                                            <Trash2 size={20} />
                                        )}
                                    </button>
                                </div>
                                <img
                                    src={brand?.url}
                                    alt={`Brand ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
                    <NoData name="Brands" />
                </div>
            )}
        </div>
    );
};

export default AdminOptions;