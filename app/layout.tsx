import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/stores/provider"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple-to-do",
  description: "A simple todolist app for storing your todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ReduxProvider>
        {children}
      </ReduxProvider>
      </body>
    </html>
  );
}

        //  sm:ml-[56px] mb-[56px] sm:mb-0 sm:w-[calc(100vw-56px)]

// w-screen sm:w-[calc(100vw-56px)] sm:ml-14 h-[calc(100dvh-56px)] mb-14 sm:mb-0 sm:h-dvh flex flex-col-reverse sm:flex-row justify-center items-center