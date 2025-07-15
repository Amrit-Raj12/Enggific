import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import CreateProductType from "./CreateProductType";
import { Button } from "@/components/ui/button";

const ProductTypeNavbar = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        
        <nav className="bg-[#E5810C] text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">Sub Category</span>
                    </div>
                    <div className="flex items-center space-x-4">
                <Button
                    className="bg-white hover:bg-gray-200 text-black ml-auto" 
                    onClick={handleOpenModal}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Sub Category
                </Button>
                </div>
                </div>
                
            </div>
            {isModalOpen && <CreateProductType isOpen={isModalOpen} onClose={handleCloseModal} />}
           
        </nav>
    );
};

export default ProductTypeNavbar;