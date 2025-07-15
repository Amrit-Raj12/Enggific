import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(0) + "k"; // Convert large numbers
  return num;
};

const UserCounter = ({ targetNumber, label }) => {
  const [count, setCount] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  
  useEffect(() => {
    // Handle numerical counters
    if (typeof targetNumber === "number") {
      let start = 0;
      const duration = 2000; // Animation duration in ms
      const increment = targetNumber / (duration / 16);
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          start = targetNumber;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 16);
      
      return () => clearInterval(counter);
    }
    
    // Handle 24/7 animation
    if (targetNumber === "24/7") {
      let hourCount = 0;
      let minCount = 0;
      
      const hoursCounter = setInterval(() => {
        if (hourCount < 24) {
          hourCount++;
          setHours(hourCount);
        } else {
          clearInterval(hoursCounter);
        }
      }, 80); // Faster for 24
      
      const minutesCounter = setInterval(() => {
        if (minCount < 7) {
          minCount++;
          setMinutes(minCount);
        } else {
          clearInterval(minutesCounter);
        }
      }, 280); // Slower for 7
      
      return () => {
        clearInterval(hoursCounter);
        clearInterval(minutesCounter);
      };
    }
  }, [targetNumber]);
  
  return (
    <div className="flex flex-col items-start w-full md:w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="xl:text-[93.65px] sm:text-[40px] text-[32px] bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-transparent bg-clip-text whitespace-nowrap"
      >
        {targetNumber === "24/7" ? (
          <>
            {hours}<span className="text-[0.8em]">/</span>{minutes}
          </>
        ) : (
          <>
            {formatNumber(count)}+
          </>
        )}
      </motion.div>
      <div className="xl:text-[24px] sm:text-base text-[10px] text-textBlack text-center">{label}</div>
    </div>
  );
};

const UserCounterList = () => {
  const stats = [
    { targetNumber: 500, label: "Products"},
    { targetNumber: 100000, label: "Happy Customers"},
    { targetNumber: 50000, label: "Orders Delivered" },
    { targetNumber: "24/7", label: "Customer Support"},
  ];
  
  return (
    <div className="2xl:flex 2xl:flex-wrap 2xl:justify-center 2xl:items-center grid grid-cols-4 gap-[28px] md:gap-[80px] lg:gap-[95px] h-full md:py-[60px] py-[30px] pt-[30px] md:px-[60px] px-[16px]">
    {stats.map((stat, index) => (
      <div key={index} className="w-full md:w-auto flex justify-start">
        <UserCounter targetNumber={stat.targetNumber} label={stat.label} />
      </div>
    ))}
  </div>
  );
};

export default UserCounterList;