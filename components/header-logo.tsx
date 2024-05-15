import Image from "next/image";
import Link from "next/link";

const HeaderLogo = () => {
    return (
        <Link
            href="/"
            className=" items-center space-x-1 hidden lg:flex focus-visible:ring-offset-0  focus-visible:ring-transparent"
        >
            <Image src="/logo.svg" height={40} width={40} alt="Logo" />
            <p className="font-bold tracking-wide text-white text-3xl">
                Finance
            </p>
        </Link>
    );
};

export default HeaderLogo;
