import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Plus, Package, Cog } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActiveRoute = (route) => location.pathname === route;

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Dispatch logout action to update the state
    dispatch(logout());
    // Navigate to login page or wherever necessary
    navigate("/admin");
    toast.success("Signed out Successfully!", { autoClose: 3000 });
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button for small screens */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-[#E5810C] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Toggle Sidebar</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-center mb-5">
            <img src="/enggific_logo.png" alt="Accernity" className="h-[64px] w-[77.77px] object-contain mr-3" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">

            </span>
          </div>
          <ul className="space-y-2 font-medium flex-grow">
            <li>
              <Link
                to="/admin/dashboard/enquiries"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/enquiries") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg> */}

                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/enquiries") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.25 6.125C9.07292 6.125 8.9245 6.06508 8.80479 5.94521C8.68492 5.8255 8.625 5.67708 8.625 5.5V1.125C8.625 0.947917 8.68492 0.799446 8.80479 0.679583C8.9245 0.559863 9.07292 0.5 9.25 0.5H14.875C15.0521 0.5 15.2005 0.559863 15.3204 0.679583C15.4401 0.799446 15.5 0.947917 15.5 1.125V5.5C15.5 5.67708 15.4401 5.8255 15.3204 5.94521C15.2005 6.06508 15.0521 6.125 14.875 6.125H9.25ZM1.125 8.625C0.947917 8.625 0.799512 8.56508 0.679792 8.44521C0.559929 8.3255 0.5 8.17708 0.5 8V1.125C0.5 0.947917 0.559929 0.799446 0.679792 0.679583C0.799512 0.559863 0.947917 0.5 1.125 0.5H6.75C6.92708 0.5 7.07554 0.559863 7.19542 0.679583C7.31512 0.799446 7.375 0.947917 7.375 1.125V8C7.375 8.17708 7.31512 8.3255 7.19542 8.44521C7.07554 8.56508 6.92708 8.625 6.75 8.625H1.125ZM9.25 15.5C9.07292 15.5 8.9245 15.4401 8.80479 15.3202C8.68492 15.2005 8.625 15.0521 8.625 14.875V8C8.625 7.82292 8.68492 7.67446 8.80479 7.55458C8.9245 7.43487 9.07292 7.375 9.25 7.375H14.875C15.0521 7.375 15.2005 7.43487 15.3204 7.55458C15.4401 7.67446 15.5 7.82292 15.5 8V14.875C15.5 15.0521 15.4401 15.2005 15.3204 15.3202C15.2005 15.4401 15.0521 15.5 14.875 15.5H9.25ZM1.125 15.5C0.947917 15.5 0.799512 15.4401 0.679792 15.3202C0.559929 15.2005 0.5 15.0521 0.5 14.875V10.5C0.5 10.3229 0.559929 10.1745 0.679792 10.0546C0.799512 9.93487 0.947917 9.875 1.125 9.875H6.75C6.92708 9.875 7.07554 9.93487 7.19542 10.0546C7.31512 10.1745 7.375 10.3229 7.375 10.5V14.875C7.375 15.0521 7.31512 15.2005 7.19542 15.3202C7.07554 15.4401 6.92708 15.5 6.75 15.5H1.125Z" />
                </svg>
                <span className="ms-3">Enquiries</span>
              </Link>
            </li>

            {/* Add Products */}
            <li>
              <Link
                to="/admin/dashboard/add/product"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/add/product") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/add/product") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.375 8.625V11.5417C7.375 11.7188 7.43529 11.8672 7.55583 11.9869C7.67625 12.1067 7.82554 12.1667 8.00375 12.1667C8.18179 12.1667 8.32988 12.1067 8.44792 11.9869C8.56596 11.8672 8.625 11.7188 8.625 11.5417V8.625H11.5417C11.7188 8.625 11.8672 8.56471 11.9871 8.44417C12.1068 8.32375 12.1667 8.17446 12.1667 7.99625C12.1667 7.81821 12.1068 7.67012 11.9871 7.55208C11.8672 7.43404 11.7188 7.375 11.5417 7.375H8.625V4.45833C8.625 4.28125 8.56471 4.13279 8.44417 4.01292C8.32375 3.89321 8.17446 3.83333 7.99625 3.83333C7.81821 3.83333 7.67012 3.89321 7.55208 4.01292C7.43404 4.13279 7.375 4.28125 7.375 4.45833V7.375H4.45833C4.28125 7.375 4.13283 7.43529 4.01312 7.55583C3.89325 7.67625 3.83333 7.82554 3.83333 8.00375C3.83333 8.18179 3.89325 8.32988 4.01312 8.44792C4.13283 8.56596 4.28125 8.625 4.45833 8.625H7.375ZM1.75 15.5C1.41667 15.5 1.125 15.375 0.875 15.125C0.625 14.875 0.5 14.5833 0.5 14.25V1.75C0.5 1.41667 0.625 1.125 0.875 0.875C1.125 0.625 1.41667 0.5 1.75 0.5H14.25C14.5833 0.5 14.875 0.625 15.125 0.875C15.375 1.125 15.5 1.41667 15.5 1.75V14.25C15.5 14.5833 15.375 14.875 15.125 15.125C14.875 15.375 14.5833 15.5 14.25 15.5H1.75Z" />
                </svg>


                <span className="flex-1 ms-3 whitespace-nowrap">Add Product</span>
              </Link>
            </li>

            {/* Products */}
            <li>
              <Link
                to="/admin/dashboard/products"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/products") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/products") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.91699 17.3333C1.58366 17.3333 1.29199 17.2083 1.04199 16.9583C0.791992 16.7083 0.666992 16.4167 0.666992 16.0833V5.24999C0.666992 4.91666 0.791992 4.62499 1.04199 4.37499C1.29199 4.12499 1.58366 3.99999 1.91699 3.99999H5.66699V1.91666C5.66699 1.58332 5.79199 1.29166 6.04199 1.04166C6.29199 0.791657 6.58366 0.666656 6.91699 0.666656H11.0837C11.417 0.666656 11.7087 0.791657 11.9587 1.04166C12.2087 1.29166 12.3337 1.58332 12.3337 1.91666V3.99999H16.0837C16.417 3.99999 16.7087 4.12499 16.9587 4.37499C17.2087 4.62499 17.3337 4.91666 17.3337 5.24999V16.0833C17.3337 16.4167 17.2087 16.7083 16.9587 16.9583C16.7087 17.2083 16.417 17.3333 16.0837 17.3333H1.91699ZM6.91699 3.99999H11.0837V1.91666H6.91699V3.99999ZM8.37533 11.2917V13.1667C8.37533 13.3437 8.43562 13.4922 8.55616 13.6119C8.67658 13.7317 8.82587 13.7917 9.00408 13.7917C9.18212 13.7917 9.3302 13.7317 9.44824 13.6119C9.56628 13.4922 9.62533 13.3437 9.62533 13.1667V11.2917H11.5003C11.6774 11.2917 11.8259 11.2314 11.9457 11.1108C12.0654 10.9904 12.1253 10.8411 12.1253 10.6629C12.1253 10.4849 12.0654 10.3368 11.9457 10.2187C11.8259 10.1007 11.6774 10.0417 11.5003 10.0417H9.62533V8.16666C9.62533 7.98957 9.56503 7.84111 9.44449 7.72124C9.32408 7.60153 9.17478 7.54166 8.99658 7.54166C8.81853 7.54166 8.67045 7.60153 8.55241 7.72124C8.43437 7.84111 8.37533 7.98957 8.37533 8.16666V10.0417H6.50033C6.32324 10.0417 6.17483 10.1019 6.05512 10.2225C5.93524 10.3429 5.87533 10.4922 5.87533 10.6704C5.87533 10.8484 5.93524 10.9965 6.05512 11.1146C6.17483 11.2326 6.32324 11.2917 6.50033 11.2917H8.37533Z" />
                </svg>


                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/users"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/users") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/users") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.3337 8.99999C17.3337 13.6023 13.6027 17.3333 9.00033 17.3333C4.39795 17.3333 0.666992 13.6023 0.666992 8.99999C0.666992 4.39761 4.39795 0.666656 9.00033 0.666656C13.6027 0.666656 17.3337 4.39761 17.3337 8.99999ZM11.5003 6.49999C11.5003 7.88074 10.3811 8.99999 9.00033 8.99999C7.61958 8.99999 6.50033 7.88074 6.50033 6.49999C6.50033 5.11928 7.61958 3.99999 9.00033 3.99999C10.3811 3.99999 11.5003 5.11928 11.5003 6.49999ZM9.00033 16.0833C10.487 16.0833 11.8667 15.6253 13.0061 14.8427C13.5093 14.497 13.7243 13.8385 13.4318 13.3027C12.8253 12.1919 11.5755 11.5 9.00024 11.5C6.42507 11.5 5.1753 12.1918 4.56878 13.3027C4.2762 13.8385 4.49124 14.4969 4.99446 14.8426C6.13381 15.6252 7.51358 16.0833 9.00033 16.0833Z" />
                </svg>


                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>

            {/* Edit Product */}
            {/* <li>
              <Link
                to="/admin/dashboard/edit/product"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/edit/product") ? "bg-[#E5810C] dark:bg-gray-700" : ""
                  }`}
              >
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Edit Product</span>
              </Link>
            </li> */}

            {/* Categories */}
            <li>
              <Link
                to="/admin/dashboard/categories"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/categories") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}

              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/categories") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.583 2.29166C14.9282 2.29166 15.208 2.57148 15.208 2.91666V4.79166H17.083C17.4282 4.79166 17.708 5.07148 17.708 5.41666C17.708 5.76183 17.4282 6.04166 17.083 6.04166H15.208V7.91666C15.208 8.26183 14.9282 8.54166 14.583 8.54166C14.2378 8.54166 13.958 8.26183 13.958 7.91666V6.04166H12.083C11.7378 6.04166 11.458 5.76183 11.458 5.41666C11.458 5.07148 11.7378 4.79166 12.083 4.79166H13.958V2.91666C13.958 2.57148 14.2378 2.29166 14.583 2.29166Z" />
                  <path d="M1.66699 5.41666C1.66699 3.64889 1.66699 2.76501 2.21617 2.21583C2.76534 1.66666 3.64923 1.66666 5.41699 1.66666C7.18476 1.66666 8.06864 1.66666 8.61783 2.21583C9.16699 2.76501 9.16699 3.64889 9.16699 5.41666C9.16699 7.18442 9.16699 8.06831 8.61783 8.61749C8.06864 9.16666 7.18476 9.16666 5.41699 9.16666C3.64923 9.16666 2.76534 9.16666 2.21617 8.61749C1.66699 8.06831 1.66699 7.18442 1.66699 5.41666Z" />
                  <path d="M10.833 14.5833C10.833 12.8156 10.833 11.9317 11.3822 11.3825C11.9313 10.8333 12.8153 10.8333 14.583 10.8333C16.3508 10.8333 17.2347 10.8333 17.7838 11.3825C18.333 11.9317 18.333 12.8156 18.333 14.5833C18.333 16.3511 18.333 17.235 17.7838 17.7842C17.2347 18.3333 16.3508 18.3333 14.583 18.3333C12.8153 18.3333 11.9313 18.3333 11.3822 17.7842C10.833 17.235 10.833 16.3511 10.833 14.5833Z" />
                  <path d="M1.66699 14.5833C1.66699 12.8156 1.66699 11.9317 2.21617 11.3825C2.76534 10.8333 3.64923 10.8333 5.41699 10.8333C7.18476 10.8333 8.06864 10.8333 8.61783 11.3825C9.16699 11.9317 9.16699 12.8156 9.16699 14.5833C9.16699 16.3511 9.16699 17.235 8.61783 17.7842C8.06864 18.3333 7.18476 18.3333 5.41699 18.3333C3.64923 18.3333 2.76534 18.3333 2.21617 17.7842C1.66699 17.235 1.66699 16.3511 1.66699 14.5833Z" />
                </svg>





                <span className="flex-1 ms-3 whitespace-nowrap">Category</span>
              </Link>
            </li>

            {/* Sub Category */}
            <li>
              <Link
                to="/admin/dashboard/product/type"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/product/type") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/product/type") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99998 1.66666C10.884 1.66666 11.7319 2.01785 12.357 2.64297C12.9821 3.26809 13.3333 4.11594 13.3333 4.99999H15.0291C15.461 4.99993 15.876 5.16748 16.1867 5.46733C16.4974 5.76719 16.6797 6.17594 16.695 6.60749L17.0516 16.6075C17.0596 16.8311 17.0224 17.0541 16.9423 17.2631C16.8622 17.4721 16.7409 17.6628 16.5855 17.8238C16.4301 17.9849 16.2439 18.113 16.0379 18.2006C15.8319 18.2881 15.6104 18.3332 15.3866 18.3333H4.61332C4.38952 18.3332 4.16803 18.2881 3.96206 18.2006C3.75609 18.113 3.56986 17.9849 3.41447 17.8238C3.25909 17.6628 3.13773 17.4721 3.05764 17.2631C2.97755 17.0541 2.94037 16.8311 2.94832 16.6075L3.30498 6.60749C3.32031 6.17594 3.50254 5.76719 3.81327 5.46733C4.12401 5.16748 4.539 4.99993 4.97082 4.99999H6.66665C6.66665 4.11594 7.01784 3.26809 7.64296 2.64297C8.26808 2.01785 9.11593 1.66666 9.99998 1.66666ZM8.33332 6.66666H6.66665V7.49999C6.66689 7.71239 6.74822 7.91668 6.89402 8.07113C7.03983 8.22558 7.23911 8.31852 7.45115 8.33097C7.66318 8.34341 7.87197 8.27443 8.03484 8.1381C8.19772 8.00178 8.3024 7.8084 8.32748 7.59749L8.33332 7.49999V6.66666ZM13.3333 6.66666H11.6666V7.49999C11.6666 7.60943 11.6882 7.71779 11.7301 7.81889C11.772 7.92 11.8333 8.01186 11.9107 8.08925C11.9881 8.16663 12.08 8.22801 12.1811 8.26989C12.2822 8.31177 12.3905 8.33332 12.5 8.33332C12.6094 8.33332 12.7178 8.31177 12.8189 8.26989C12.92 8.22801 13.0119 8.16663 13.0892 8.08925C13.1666 8.01186 13.228 7.92 13.2699 7.81889C13.3118 7.71779 13.3333 7.60943 13.3333 7.49999V6.66666ZM9.99998 3.33332C9.5795 3.33319 9.17451 3.492 8.86619 3.7779C8.55788 4.06381 8.36902 4.45569 8.33748 4.87499L8.33332 4.99999H11.6666C11.6666 4.55796 11.4911 4.13404 11.1785 3.82148C10.8659 3.50892 10.442 3.33332 9.99998 3.33332Z" />
                </svg>


                <span className="flex-1 ms-3 whitespace-nowrap">Sub Category</span>
              </Link>
            </li>

            {/* Admin Options */}
            <li>
              <Link
                to="/admin/dashboard/admin-options"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/admin-options") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/admin-options") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.0212 13.3125C14.6323 13.3125 15.1392 13.1111 15.542 12.7083C15.9448 12.3056 16.1462 11.7986 16.1462 11.1875C16.1462 10.5764 15.9448 10.0695 15.542 9.66668C15.1392 9.26389 14.6323 9.06251 14.0212 9.06251C13.41 9.06251 12.9031 9.26389 12.5003 9.66668C12.0975 10.0695 11.8962 10.5764 11.8962 11.1875C11.8962 11.7986 12.0975 12.3056 12.5003 12.7083C12.9031 13.1111 13.41 13.3125 14.0212 13.3125ZM13.9587 15.2917C13.8059 15.2917 13.667 15.2361 13.542 15.125C13.417 15.0139 13.3475 14.882 13.3337 14.7292L13.292 14.2917C12.9725 14.1945 12.6809 14.066 12.417 13.9063C12.1531 13.7466 11.924 13.5764 11.7295 13.3958L11.3753 13.5625C11.2225 13.632 11.0698 13.6424 10.917 13.5938C10.7642 13.5451 10.6392 13.4514 10.542 13.3125L10.4587 13.1875C10.3615 13.0347 10.3267 12.8785 10.3545 12.7188C10.3823 12.5591 10.4656 12.4236 10.6045 12.3125L10.917 12.0625C10.8475 11.7986 10.8128 11.5104 10.8128 11.1979C10.8128 10.8854 10.8475 10.5972 10.917 10.3333L10.6045 10.0833C10.4656 9.97222 10.3823 9.83334 10.3545 9.66668C10.3267 9.50001 10.3615 9.3403 10.4587 9.18751L10.542 9.06251C10.6392 8.90972 10.7677 8.81251 10.9274 8.77084C11.0871 8.72918 11.2434 8.74305 11.3962 8.81251L11.7295 8.97918C11.924 8.81251 12.1531 8.6493 12.417 8.48959C12.6809 8.32989 12.9725 8.20139 13.292 8.10418L13.3337 7.64584C13.3475 7.49305 13.417 7.36114 13.542 7.25001C13.667 7.13889 13.8059 7.08334 13.9587 7.08334H14.1045C14.2573 7.08334 14.3892 7.13543 14.5003 7.23959C14.6115 7.34376 14.6809 7.47222 14.7087 7.62501L14.7712 8.10418C15.0906 8.20139 15.3823 8.32989 15.6462 8.48959C15.91 8.6493 16.1392 8.81251 16.3337 8.97918L16.667 8.81251C16.8198 8.74305 16.976 8.72918 17.1357 8.77084C17.2955 8.81251 17.424 8.90972 17.5212 9.06251L17.6045 9.18751C17.7017 9.3403 17.7365 9.50001 17.7087 9.66668C17.6809 9.83334 17.5975 9.97222 17.4587 10.0833L17.1462 10.3333C17.2156 10.5972 17.2503 10.8854 17.2503 11.1979C17.2503 11.5104 17.2156 11.7986 17.1462 12.0625L17.4587 12.3125C17.5975 12.4236 17.6809 12.5591 17.7087 12.7188C17.7365 12.8785 17.7017 13.0347 17.6045 13.1875L17.5212 13.3333C17.424 13.4722 17.299 13.5625 17.1462 13.6042C16.9934 13.6458 16.8406 13.632 16.6878 13.5625L16.3337 13.3958C16.1392 13.5764 15.91 13.7466 15.6462 13.9063C15.3823 14.066 15.0906 14.1945 14.7712 14.2917L14.7087 14.75C14.6809 14.9028 14.6115 15.0313 14.5003 15.1354C14.3892 15.2396 14.2573 15.2917 14.1045 15.2917H13.9587ZM1.91699 13.6667C1.58366 13.6667 1.29199 13.5382 1.04199 13.2813C0.791992 13.0243 0.666992 12.7361 0.666992 12.4167V1.58334C0.666992 1.26389 0.791992 0.975706 1.04199 0.71876C1.29199 0.461814 1.58366 0.333344 1.91699 0.333344H7.25033C7.41699 0.333344 7.5802 0.368064 7.73991 0.43751C7.89962 0.506956 8.03503 0.597231 8.14616 0.708344L9.02116 1.58334H16.0837C16.4031 1.58334 16.6913 1.7118 16.9482 1.96876C17.2052 2.22572 17.3337 2.51389 17.3337 2.83334V6.00001C17.3337 6.19447 17.2538 6.33334 17.0941 6.41668C16.9344 6.50001 16.7712 6.49305 16.6045 6.39584C16.2017 6.18751 15.785 6.0278 15.3545 5.91668C14.9239 5.80555 14.4795 5.75001 14.0212 5.75001C12.4656 5.75001 11.174 6.28822 10.1462 7.36459C9.11837 8.44097 8.60449 9.70834 8.60449 11.1667C8.60449 11.4722 8.62878 11.7743 8.67741 12.0729C8.72603 12.3716 8.79895 12.6597 8.89616 12.9375C8.96562 13.1181 8.94824 13.2847 8.84408 13.4375C8.73991 13.5903 8.59753 13.6667 8.41699 13.6667H1.91699Z" />
                </svg>


                <span className="flex-1 ms-3 whitespace-nowrap">Admin Options</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/dashboard/termsandconditions"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/termsandconditions") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/termsandconditions") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.75 15.5C1.40625 15.5 1.11201 15.3776 0.867292 15.1327C0.622429 14.888 0.5 14.5938 0.5 14.25V1.75C0.5 1.40625 0.622429 1.11195 0.867292 0.867083C1.11201 0.622362 1.40625 0.5 1.75 0.5H9.5625C9.73529 0.5 9.9 0.534721 10.0567 0.604167C10.2133 0.673613 10.3472 0.763887 10.4583 0.875L15.125 5.54167C15.2361 5.65279 15.3264 5.78667 15.3958 5.94333C15.4653 6.1 15.5 6.26471 15.5 6.4375V14.25C15.5 14.5938 15.3776 14.888 15.1329 15.1327C14.888 15.3776 14.5938 15.5 14.25 15.5H1.75ZM4.4375 11.9375H11.5625C11.7396 11.9375 11.888 11.8772 12.0079 11.7567C12.1276 11.6363 12.1875 11.487 12.1875 11.3088C12.1875 11.1307 12.1276 10.9826 12.0079 10.8646C11.888 10.7465 11.7396 10.6875 11.5625 10.6875H4.4375C4.26042 10.6875 4.112 10.7478 3.99229 10.8683C3.87242 10.9887 3.8125 11.138 3.8125 11.3162C3.8125 11.4943 3.87242 11.6424 3.99229 11.7604C4.112 11.8785 4.26042 11.9375 4.4375 11.9375ZM4.4375 8.625H11.5625C11.7396 8.625 11.888 8.56471 12.0079 8.44417C12.1276 8.32375 12.1875 8.17446 12.1875 7.99625C12.1875 7.81821 12.1276 7.67012 12.0079 7.55208C11.888 7.43404 11.7396 7.375 11.5625 7.375H4.4375C4.26042 7.375 4.112 7.43529 3.99229 7.55583C3.87242 7.67625 3.8125 7.82554 3.8125 8.00375C3.8125 8.18179 3.87242 8.32988 3.99229 8.44792C4.112 8.56596 4.26042 8.625 4.4375 8.625ZM4.4375 5.3125H8.9375C9.11458 5.3125 9.26304 5.25221 9.38292 5.13167C9.50262 5.01125 9.5625 4.86196 9.5625 4.68375C9.5625 4.50571 9.50262 4.35763 9.38292 4.23958C9.26304 4.12154 9.11458 4.0625 8.9375 4.0625H4.4375C4.26042 4.0625 4.112 4.12279 3.99229 4.24333C3.87242 4.36375 3.8125 4.51304 3.8125 4.69125C3.8125 4.86929 3.87242 5.01737 3.99229 5.13542C4.112 5.25346 4.26042 5.3125 4.4375 5.3125Z" />
                </svg>


                <span className="flex-1 ms-3 whitespace-nowrap">Terms and Conditions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/pravacy-policy"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group ${isActiveRoute("/admin/dashboard/pravacy-policy") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                  }`}
              >
                <svg className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/pravacy-policy") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.75 15.5C1.40625 15.5 1.11201 15.3776 0.867292 15.1327C0.622429 14.888 0.5 14.5938 0.5 14.25V1.75C0.5 1.40625 0.622429 1.11195 0.867292 0.867083C1.11201 0.622362 1.40625 0.5 1.75 0.5H9.5625C9.73529 0.5 9.9 0.534721 10.0567 0.604167C10.2133 0.673613 10.3472 0.763887 10.4583 0.875L15.125 5.54167C15.2361 5.65279 15.3264 5.78667 15.3958 5.94333C15.4653 6.1 15.5 6.26471 15.5 6.4375V14.25C15.5 14.5938 15.3776 14.888 15.1329 15.1327C14.888 15.3776 14.5938 15.5 14.25 15.5H1.75ZM4.4375 11.9375H11.5625C11.7396 11.9375 11.888 11.8772 12.0079 11.7567C12.1276 11.6363 12.1875 11.487 12.1875 11.3088C12.1875 11.1307 12.1276 10.9826 12.0079 10.8646C11.888 10.7465 11.7396 10.6875 11.5625 10.6875H4.4375C4.26042 10.6875 4.112 10.7478 3.99229 10.8683C3.87242 10.9887 3.8125 11.138 3.8125 11.3162C3.8125 11.4943 3.87242 11.6424 3.99229 11.7604C4.112 11.8785 4.26042 11.9375 4.4375 11.9375ZM4.4375 8.625H11.5625C11.7396 8.625 11.888 8.56471 12.0079 8.44417C12.1276 8.32375 12.1875 8.17446 12.1875 7.99625C12.1875 7.81821 12.1276 7.67012 12.0079 7.55208C11.888 7.43404 11.7396 7.375 11.5625 7.375H4.4375C4.26042 7.375 4.112 7.43529 3.99229 7.55583C3.87242 7.67625 3.8125 7.82554 3.8125 8.00375C3.8125 8.18179 3.87242 8.32988 3.99229 8.44792C4.112 8.56596 4.26042 8.625 4.4375 8.625ZM4.4375 5.3125H8.9375C9.11458 5.3125 9.26304 5.25221 9.38292 5.13167C9.50262 5.01125 9.5625 4.86196 9.5625 4.68375C9.5625 4.50571 9.50262 4.35763 9.38292 4.23958C9.26304 4.12154 9.11458 4.0625 8.9375 4.0625H4.4375C4.26042 4.0625 4.112 4.12279 3.99229 4.24333C3.87242 4.36375 3.8125 4.51304 3.8125 4.69125C3.8125 4.86929 3.87242 5.01737 3.99229 5.13542C4.112 5.25346 4.26042 5.3125 4.4375 5.3125Z" />
                </svg>


                <span className="flex-1 ms-3 whitespace-nowrap">Privacy Policy</span>
              </Link>
            </li>
          </ul>
          {/* Profile section */}
          <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/admin/dashboard/change-credentials"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group 
              ${isActiveRoute("/admin/dashboard/change-credentials") ? "bg-[#E5810C] text-white dark:bg-gray-700" : ""
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${isActiveRoute("/admin/dashboard/change-credentials") ? "fill-white text-white dark:bg-gray-700" : "fill-black"
                  }`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>

              <span className="flex-1 ms-3 whitespace-nowrap">Change Credentials</span>

            </Link>
            <Link
              to="/admin"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#E5810C] hover:text-white dark:hover:bg-gray-700 group"
            >
              <svg className={`w-5 h-5 ${false ? "fill-white text-white dark:bg-gray-700" : ""
                  }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap" onClick={handleLogout}>Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;