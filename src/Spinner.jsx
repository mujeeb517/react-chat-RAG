import React from "react";

const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
        </div>
    );
};

export default Spinner;