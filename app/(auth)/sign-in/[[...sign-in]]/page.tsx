import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader, Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
    return <SignIn path="/sign-in" />;
}
