import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/authSlice";
import productListSlice from "../redux/productSlice";
import categorySlice from "../redux/categorySlice";
import enquiryListSlice from "../redux/enquiriesSlice";
import usersSlice from "../redux/usersSlice";
import bannerSlice from "../redux/bannerSlice";
import brandSlice from "../redux/brandSlice";
import socialMediaLinkSlice from "../redux/socialMediaSlice"; 
import logoSlice from "../redux/logoSlice";
import termsSlice from "../redux/termsSlice";
import privacySlice from "../redux/privacySlice";
import productTypeSLice from "../redux/productTypeSlice";
import clientAuthReducer from "../redux/clientSlice/clientAuthSlice";
import idReducer from "../redux/clientSlice/idSlice";
import positionReducer from "../redux/clientSlice/positionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    clientAuth: clientAuthReducer, // Client authentication
    idStore: idReducer,
    position: positionReducer,
    productList: productListSlice,
    categoryList: categorySlice,
    enquiryList: enquiryListSlice,
    usersList: usersSlice,
    bannerList: bannerSlice,
    brandList: brandSlice,
    socialMediaLink: socialMediaLinkSlice, 
    logo: logoSlice,
    terms: termsSlice,
    privacy: privacySlice,
    productTypeList: productTypeSLice,
  },
});

export default store;