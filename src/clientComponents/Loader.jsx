import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            {/* <img
                src="/enggific_logo.png"
                alt="Logo Loader"
                className="w-[77.77px] h-[64px] animate-[pulse_0.8s_ease-in-out_infinite]"
            /> */}
            <span className="loader"></span>
        </div>
    );
};

export default Loader;