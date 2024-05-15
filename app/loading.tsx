import Loading from "@/components/loading";
import React from "react";

const LoadingPage = () => {
    return (
        <div className="w-full h-full flex justify-center items-center ">
            <Loading type="spinner" />
        </div>
    );
};

export default LoadingPage;
