import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SessionWrapper from "./component/SessionWrapper";
import ToastProvider from "./component/ToastProvider";





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me chai",
  description: "This website is about get me chai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white"
      >
      
      <SessionWrapper>
      <Navbar/>
        <div className="min-h-screen w-full  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white  ">
    
        {children}
         </div>
         </SessionWrapper>
        
        <Footer/>
        <ToastProvider/>
        
      </body>
    </html>
  );
}
