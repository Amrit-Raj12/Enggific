import { addId } from '@/redux/clientSlice/idSlice';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const EquipmentCard = ({ equipment, page, subName, catId, subId, index }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdd = (newId) => {
        dispatch(addId({ idType: "category", id: newId }));
        // setIdType("");
        // setId("");
        navigate(`/${(equipment.name).replace(/\s+/g, '-')}/sub-categories`);
    };

    const handleNavigate = () => {
        if (page === 'sub-category') {
            dispatch(addId({ idType: "sub-category", id: subId }));
            navigate(`/${subName.replace(/\s+/g, '-')}/${catId}/${(equipment.name).replace(/\s+/g, '-')}/${subId}`);
        } else {
            // console.log("equipment._id", equipment._id)
            handleAdd(equipment._id);
        }
    };

    // console.log("page", page)
    const backgroundImage = page === 'sub-category' ? equipment.productTypeLogo : equipment.categoryLogo;

    return (
        <div
        className="relative w-full h-80 rounded-[12px] overflow-hidden cursor-pointer border border-gray-200 group hover:border-[2px] hover:border-[#F44208]"
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

export default EquipmentCard;