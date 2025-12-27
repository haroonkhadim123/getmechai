"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Loader from "./component/Loader";

export default function Home() {
  const router= useRouter();
  const [loader, setloader] = useState(false)
  const handleclick=()=>{
    setloader(true)
    router.push('/signup')
    setloader(false)

  }
  return (
<>
<div className="flex justify-center min-w-screen  items-center text-center h-[44vh] gap-2 flex-col  text-white">
  <div className="font-bold flex w-full  items-center justify-center text-2xl md:text-3xl">Get Me a Chai <span><img width={88} src="/tea.gif" alt="" /></span></div>
  <p className="text-gray-200 px-2 md:px-0">A crowdfunding platform for creators. Get funded by your fans and followers. start now!</p>
  <div className="flex items-center justify-center gap-4 mt-2 flex-row">
 <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl  dark:focus:ring-blue-800   rounded-base  px-4 py-2.5 text-center leading-5">Read More</button>
 <button disabled={loader} onClick={handleclick} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl  dark:focus:ring-blue-800   rounded-base  px-4 py-2.5 text-center leading-5">{loader ? <Loader/> : "start Here"}</button>
  
  </div>
</div>
<div className="h-1 bg-white opacity-10"></div>
<div className=" p-5">
  <p className="text-white font-bold text-center mt-4 text-2xl">Your fan can buy you a chai</p>
  <div className="flex items-center flex-wrap justify-center gap-12 mt-8 mb-8">
    <div className="flex flex-col items-center justify-center gap-2 text-white">
      <img width={150} src="/coin.gif" alt="" />
      <h1 className="font-bold">Fund Yourself</h1>
      <p className="text-gray-200">Your fans are available for your support.</p>
    </div>
     <div className="flex flex-col items-center justify-center gap-2 text-white">
      <img width={150} src="/man.gif" alt="" />
      <h1 className="font-bold">Fund Yourself</h1>
      <p className="text-gray-200">Your fans are available for your support.</p>
    </div>
     <div className="flex flex-col items-center justify-center gap-2 text-white">
      <img width={150} src="/group.gif" alt="" />
      <h1 className="font-bold">Fund Yourself</h1>
      <p className="text-gray-200">Your fans are available for your support.</p>
    </div>
  </div>
</div>
<div className="h-1 bg-white opacity-10"></div>

<div className=" p-5">
  <p className="text-white font-bold text-center mt-4 text-2xl">Learn more About us</p>
  <div className="mt-8 mb-8 md:w-[50vw] w-[90vw] items-center justify-center flex mx-auto h-[40vh]">
    <iframe className="w-full h-full" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

          </div>
  </div>


</>
  );
}
