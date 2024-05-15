import React from "react";

interface BackgroundProps {
    children: React.ReactNode;
    type?: "dot" | "grid" | "small-grid" | "top-grid";
}

const Background = ({ children, type = "dot" }: BackgroundProps) => {
    return (
        <>
            {type === "dot" && (
                <div className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <div className="z-[2]">{children}</div>
                </div>
            )}

            {type === "grid" && (
                <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
                    {/* Radial gradient for the container to give a faded look */}
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <div className="z-[2]">{children}</div>
                </div>
            )}

            {type === "small-grid" && (
                <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
                    {/* Radial gradient for the container to give a faded look */}
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                    <div className="z-[2]">{children}</div>
                </div>
            )}

            {type === "top-grid" && (
                <div className="h-full w-full dark:bg-black bg-white relative flex items-center justify-center">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
                    <div className="z-[2]">{children}</div>
                </div>
            )}
        </>
    );
};

export default Background;
