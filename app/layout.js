import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import head from "next/head";


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Sugar Ready! - Start you career!",
  description: "Sugar Ready is a platform that allows creators to connect with their supporters and receive contributions easily. Join us to support your favorite creators and enjoy exclusive content and rewards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
      <SessionWrapper>
        <Navbar/>
        {children}
        <Footer/>
      </SessionWrapper>
      </body>
    </html>
  );
}
