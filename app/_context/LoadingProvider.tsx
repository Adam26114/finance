"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function LoadingProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ProgressBar
                height="4px"
                color="#8C7CF2"
                options={{ showSpinner: true }}
                shallowRouting
                
            />
            <div className=" w-full  h-full ">{children}</div>
        </>
    );
}

export default LoadingProvider;
