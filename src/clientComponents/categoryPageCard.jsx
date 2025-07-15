import { addId } from '@/redux/clientSlice/idSlice';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const CategoryPageCard = ({ equipment, page, subName, subId, index }) => {
    const [idType, setIdType] = useState("");
    const [id, setId] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const category = {
        id: '1'
    };

    const handleAdd = (newId) => {
        dispatch(addId({ idType: "category", id: newId }));
        // setIdType("");
        // setId("");
        navigate(`/${(equipment.name).replace(/\s+/g, '-')}/${newId}/sub-categories`);
    };

    const handleNavigate = () => {
        if (page === 'sub-category') {
            dispatch(addId({ idType: "sub-category", id: subId }));
            navigate(`/${subName.replace(/\s+/g, '-')}/${(equipment.name).replace(/\s+/g, '-')}`);
        } else {
            // console.log("equipment._id", equipment._id)
            handleAdd(equipment._id);
        }
    };

    // console.log("page", page)
    const backgroundImage = page === 'sub-category' ? equipment.productTypeLogo : equipment.categoryLogo;

    return (
        // <div onClick={handleNavigate} className='w-full cursor-pointer rounded-[12px] group border border-gray-200'
        // style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)' }}
        // >
        //     <div className='h-[160px] sm:h-[283px] rounded-t-[12px] bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${backgroundImage})` }}>
        //     </div>
        //     <div className='sm:h-[68.53px] px-2 sm:px-4 md:px-[31px] py-[10px] sm:py-[20px] flex gap-[13.2px] justify-center items-center overflow-hidden transition-all duration-300 rounded-b-[12px] group-hover:bg-gradient-to-r from-[#F8710C] to-[#F22B06] border-t-2 border-[#E0E0E0] group-hover:text-white'>
        //         <p className='break-words text-[12px] sm:text-base text-center capitalize truncate'>{equipment.name.toLowerCase()}</p>
        //     </div>
        // </div>
        <div
        className="relative w-full h-80 rounded-[12px] overflow-hidden cursor-pointer border border-gray-200 group hover:border-[2px] hover:border-[#F44208]"
        // key={index}
        // style={{
        //   width: `calc((100% - ${(itemsPerScreen - 1) * 21}px) / ${itemsPerScreen})`,
        // }}
        onClick={handleNavigate}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <img
          src={backgroundImage}
          alt={equipment.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full h-[140px] bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-row items-end justify-between p-4">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-white text-[18px] font-bold leading-[28px] capitalize whitespace-pre-wrap min-w-[90] w-[190px]">
              {equipment.name.toLowerCase()}
            </h3>
            <motion.div
              className="bg-gradient-to-r from-[#F8710C] to-[#F22B06] w-[52px] h-[52px] flex items-center justify-center rounded-full mt-2"
              animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <svg
                width={36}
                height={36}
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5625 26.4375L26.4375 9.5625M26.4375 9.5625H13.7812M26.4375 9.5625V22.2188"
                  stroke="white"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

    );
};

export default CategoryPageCard 