import React, { useState } from "react";

const UsersAndTersmsNavbar = ({ title }) => {

    return (
        
        <nav className="bg-[#E5810C] text-white shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">{title}</span>
                    </div>
                    <div className="flex items-center space-x-4">
               
                </div>
                </div>
                
            </div>

        </nav>
    );
};

export default UsersAndTersmsNavbar;