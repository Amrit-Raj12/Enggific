import useFetchData from '@/clientComponents/utils/useFetchData';
import { BASE_URL } from '@/constants';
import React from 'react'
import DOMPurify from "dompurify";
import Loader from '@/clientComponents/Loader';

const TermsCondition = () => {

    const apiUrl = `${BASE_URL}/admin/get/terms`;

    const { data, loading } = useFetchData(apiUrl);

    console.log("terms", data)

    if(loading) return <Loader />


     // Function to render content with custom styling for lists
  const renderContent = (html) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return sanitizedHtml.replace(/<ul>/g, '<ul className="list-none pl-5">')
      .replace(/<ol>/g, '<ul className="list-none pl-5">') // Convert ordered lists to unordered
      .replace(/<li>/g, '<li className="relative pl-6 mb-2 before:absolute before:left-0 before:top-1/2 before:w-3 before:h-3 before:bg-orange-500 before:rounded-sm before:-translate-y-1/2">');
  };

  return (
    <div className='xl:mt-[170px] mt-[100px] lg:px-[60px] px-[16px]'>
      {/* <h1>Terms and Conditions</h1> */}
      <div className="w-full mx-auto p-6 text-textBlack">
      <h1 className="md:text-[38px] text-[26px] font-bold text-center lg:mb-[60px] mb-[30px]">Terms and Conditions</h1>
      <p className="text-sm text-gray-400 mb-2">
        {/* Last Updated: {new Date(data.lastUpdated).toLocaleDateString()} */}
      </p>
      <div
        className="prose prose-invert max-w-none custom-editor"
        dangerouslySetInnerHTML={{ __html: renderContent(data.content) }}
      ></div>
    </div>
    </div>
  )
}

export default TermsCondition