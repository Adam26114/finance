import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProviders } from "@/provider/query-provider";
import { SheetProvider } from "@/provider/sheet-provider";
import { Toaster } from "@/components/ui/sonner";
import LoadingProvider from "./_context/LoadingProvider";
import Head from "next/head";

const font = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Finance Myanmar",
    description: "To calculate your financial",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                </head>

                <body className={font.className}>
                    <QueryProviders>
                        <SheetProvider />
                        <Toaster />
                        <LoadingProvider>{children}</LoadingProvider>
                    </QueryProviders>
                </body>
            </html>
        </ClerkProvider>
    );
}
