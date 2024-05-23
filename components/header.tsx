import HeaderLogo from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { WelComeMsg } from "@/components/wellcome-msg";
import { Filters } from "@/components/filters";

export const Header = () => {
    return (
        <header className=" bg-gradient-to-b from-[#021535] to-[#8A7AF0] px-5 py-8 lg:px-14 pb-36">
            <div className=" max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14 ">
                    <div className=" flex items-center lg:gap-x-16 ">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <ClerkLoading>
                        <Loader className="animate-spin size-5 text-white " />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl="/" />
                    </ClerkLoaded>
                </div>
                <WelComeMsg />
                <Filters/>
            </div>
        </header>
    );
};
