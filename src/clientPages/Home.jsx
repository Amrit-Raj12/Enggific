import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '@/clientComponents/Loader';
import HeroCarousel from '@/clientComponents/HeroCarousel';
import useFetchData from '@/clientComponents/utils/useFetchData';
import { BASE_URL } from '@/constants';
// import About from "@/clientComponents/About";
//import ChooseUs from "@/clientComponents/ChooseUs";
import UserCounterList from "@/clientComponents/UserCounterList";
import { AnimatedList } from "@/components/magicui/animated-list";
import ProductByCategory from '@/clientComponents/ProductByCategory';

const About = lazy(() => import('@/clientComponents/About'));
const ChooseUs = lazy(() => import('@/clientComponents/ChooseUs'));
const CompanyBanners = lazy(() => import('@/clientComponents/CompanyBanners'));
const EquipmentsCards = lazy(() => import('@/clientComponents/EquipmentsCards'));
const KnowUs = lazy(() => import('@/clientComponents/KnowUs'));
const LaunchedProducts = lazy(() => import('@/clientComponents/LaunchedProducts'));
const OurCards = lazy(() => import('@/clientComponents/OurCards'));
//const UserCounterList = lazy(() => import('@/clientComponents/UserCounterList'));

const Home = () => {
  const navigate = useNavigate();
  const apiUrl = `${BASE_URL}/admin/get/banners`;
  const { data, loading, error } = useFetchData(apiUrl);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  // console.log("data", data)

  return (
    <div>
      <HeroCarousel carouselData={data.banners ? data.banners : []} />
      <CompanyBanners />
        <EquipmentsCards />
      {/* <LaunchedProducts /> */}
      <ProductByCategory />
      {/* <UserCounterList /> */}
      <About />
      <LaunchedProducts />
      <Suspense fallback={<Loader />}>
       
        {/* <AnimatedComponent> */}
        <ChooseUs />
        {/* </AnimatedComponent> */}
        <OurCards />
        {/* <AnimatedComponent> */}
        
        {/* </AnimatedComponent> */}
        <KnowUs />
        
      </Suspense>
    </div>
  );
};

export default Home;