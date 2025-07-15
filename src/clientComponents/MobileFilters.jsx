import { X } from "lucide-react";

const MobileFilters = ({ filters, activeFilter, setActiveFilter, isOpen, setIsOpen}) => {

    return (
        <div>
            {/* Sidebar for mobile */}
            <div
                className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <p className="text-lg font-bold text-textBlack">Sub Category</p>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="text-textBlack" />
                    </button>
                </div>

                <div className="p-4 space-y-2">
                    {(filters && filters.length > 0) &&
                        filters.slice(0, 3).map((filter) => (
                            <div
                                key={filter._id}
                                className={`w-full h-[49px] px-[11px] flex items-center cursor-pointer rounded-md 
                                    ${activeFilter === filter._id ? 'bg-[#FCF1E4] text-[#E5810C]' : 'text-textBlack'} 
                                    hover:bg-[#FCF1E4] hover:text-[#E5810C] transition duration-300`}
                                onClick={() => setActiveFilter(filter._id)}
                            >
                                <p className="text-base">{filter.name}</p>
                            </div>
                        ))}
                </div>
            </div>

            {/* Large screen filter section */}
            <div className="hidden space-y-4 lg:block">
                <div>
                    <p className="block text-lg font-bold text-textBlack px-[11px] mb-[17px]">Sub Category</p>
                    <div className="space-y-2">
                        {(filters && filters.length > 0) &&
                            filters.slice(0, 3).map((filter) => (
                                <div
                                    key={filter._id}
                                    className={`w-[265px] h-[49px] px-[11px] flex items-center cursor-pointer rounded-md 
                                        ${activeFilter === filter._id ? 'bg-[#FCF1E4] text-[#E5810C]' : 'text-textBlack'} 
                                        hover:bg-[#FCF1E4] hover:text-[#E5810C] transition duration-300`}
                                    onClick={() => setActiveFilter(filter._id)}
                                >
                                    <p className="text-base">{filter.name}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileFilters;
