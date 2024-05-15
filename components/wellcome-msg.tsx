"use client";

import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";
import { CircleDollarSign, HandCoins, Loader } from "lucide-react";

export const WelComeMsg = () => {
    const { user, isLoaded } = useUser();

    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white  font-bold flex items-center">
                Welcome Back {isLoaded ? ", " : "..."}
                    {user?.firstName ? user.firstName : user?.username}
                <CircleDollarSign className="size-10 ml-2 text-yellow-500" />
            </h2>
            <p className="text-sm lg:text-base text-white/70">
                This is your Finical Overview Report
            </p>
        </div>
    );
};
