import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center 1000-less:w-[185.33px] xl:w-[589px]">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-[5px] p-2 pl-4 pr-10 text-gray-600 border-none focus:outline-none bg-[#F8F8F8]"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-0 top-0 h-full md:w-[45.33px] xl:w-[64px] px-4 bg-gradient-to-r from-[#F8710C] to-[#F22B06] text-white flex items-center justify-center rounded-r-[5px]"
                >
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9873 17.9875L22.5104 22.5105" stroke="white" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.15625 11.2025C2.15625 16.1987 6.20634 20.2488 11.2024 20.2488C13.7048 20.2488 15.9698 19.2327 17.6076 17.5907C19.2396 15.9543 20.2486 13.6963 20.2486 11.2025C20.2486 6.20651 16.1985 2.15642 11.2024 2.15642C6.20634 2.15642 2.15625 6.20651 2.15625 11.2025Z" stroke="white" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SearchBox;