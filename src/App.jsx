import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./adminPages/AdminLogin";
import ProtectedRoute from "./adminComponents/ProtectedRoute";
import Sidebar from "./adminComponents/Sidebar";
import Products from "./adminPages/Products";
import Enquiries from "./adminPages/Enquries";
import Users from "./adminPages/Users";
import Categories from "./adminPages/Categories";
import AdminOptions from "./adminPages/AdminOptions";
import TermsAndConditions from "./adminPages/TermsAndConditions";
import ChangeCredentials from "./adminComponents/ChangeCredentials";
import CreateProduct from "./adminComponents/CreateProduct";
import ProductTypes from "./adminPages/ProductType";
import Header from "./clientComponents/Header";
import Footer from "./clientComponents/Footer";
import Home from "./clientPages/Home";
import { Outlet } from "react-router-dom";
import ProductCategories from "./clientPages/Products/ProductCategories";
import ProductSubCategories from "./clientPages/Products/ProductSubCategories";
import ProductList from "./clientPages/Products/ProductList";
import ProductDetail from "./clientPages/Products/ProductDetail";
import "./App.css"
import SearchedProduct from "./clientPages/Products/SearchedProduct";
import AboutUs from "./clientPages/AboutUs";
import ContactUs from "./clientPages/ContactUs";
import ScrollToTop from "./clientComponents/ScrollToTop";
import WhatsAppIcon from "./clientComponents/WhatsAppIcon";
import TermsCondition from "./clientPages/TermsCondition";
import AdminPrivacyPolicy from "./adminPages/AdminPrivacyPolicy";
import PrivacyPolicy from "./clientPages/ClientPrivacyPolicy";


const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1  ml-64">
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="product/type" element={<ProductTypes />} />
          <Route path="admin-options" element={<AdminOptions />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/pravacy-policy" element={<AdminPrivacyPolicy />} />
          <Route path="/change-credentials" element={<ChangeCredentials />} />
          <Route path="/add/product" element={<CreateProduct />} />
          {/* Add more routes for other dashboard pages here */}
        </Routes>
      </div>
    </div>
  );
};

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <main className="xl:mt-[70px] mt-[68px]">
        <Outlet /> {/* Renders nested routes inside DefaultLayout */}
      </main>
      <Footer />
    </div>
  );
};

function App() {

  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <BrowserRouter>
    <ScrollToTop/>{/* This will ensure scrolling to top on route change */}
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />


         {/* Client Routes inside DefaultLayout */}
         <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/product-categories" element={<ProductCategories />} />
          <Route path="/:categoryName/:categoryId/sub-categories" element={<ProductSubCategories />} />
          {/* <Route path="/product-categories/:categoryId/:subCategoryId" element={<ProductList />} /> */}
          <Route path="/:categoryName/:categoryId/:subCategoryName/:subCategoryId" element={<ProductList />} />
          {/* <Route path="/products" element={<ProductList />} /> */}
          {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
          <Route path="/:subCategoryName/:productName/:productId" element={<ProductDetail />} />
          <Route path="/search" element={<SearchedProduct />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-of-service" element={<TermsCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
      {/* Show WhatsApp Icon only on non-admin routes */}
      {!isAdminRoute && <WhatsAppIcon />}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;