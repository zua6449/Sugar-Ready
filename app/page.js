'use client'
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { ShowUser } from "@/db/updateDB";
import Link from "next/link";

export default function Home() {
  let {data : session} = useSession()
  const [username1, setUsername1] = useState()
  const [pp, setpp] = useState()
  useEffect(() => {
    let a = async() =>{
      if(session){
        console.log(session)
        let res = await ShowUser(session.user.email)
        setUsername1(res.username)
        setpp(res.profile_picture)
      }
    }
    a()
  }, [session])
  
  return (
    <>
    
      <div className="w-full">

        {/* First Section */}
        <div className="main_cover w-full h-[70vh] overflow-hidden flex items-center justify-center">
        <div className="w-[90%] main bg-[#00000071] h-[80%] rounded-sm text-white flex gap-6 flex-col justify-center items-start p-10">
            <h1 className="text-5xl md:text-8xl font-extrabold rounded-xl p-2">Finance your artistic endeavors</h1>
            <p className="text-xl">Receive assistance. Begin a subscription. Establish <b className="text-[#68972C]">your career</b>. It's simpler than you imagine.</p>
            <span className="">
            <Link href={session ? `/${username1}` : '/Login'}><button class="cta flex items-center"> <span class="hover-underline-animation " > {session ? 'Go to Profile' : 'Begin Now!'} </span> <svg className="-mt-2 invert" id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16" > <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)" ></path> </svg></button></Link>
            </span>
          </div>
        </div>
        
        {/* Second Section */}
        <div className=" pb-16 w-full -mt-32">
        <h1 className="text-center text-4xl lg:text-7xl font-bold mt-48">G<span className="text-[#68972C]">e</span>t P<span className="text-[#68972C]">a</span>id!</h1>
        <div className="mt-10 flex justify-center flex-wrap items-center gap-5">
            <div className="flex flex-col items-center  justify-center gap-4 text-center shadow-lg rounded-xl w-72 h-96 p-5">
              <div className="w-48 overflow-hidden rounded-xl"><img className=" w-full hover:scale-[1.4] cursor-pointer transition-all " src="row11.jpg" alt="Step 1 Icon" /></div>
              <h3 className="font-semibold text-xl">Create an Account</h3>
              <p>Get started by creating your free account in just a few minutes.</p>
            </div>
            <div className="flex flex-col items-center  justify-center gap-4 text-center shadow-lg rounded-xl w-72 h-96 p-5">
            <div className="w-48 overflow-hidden rounded-xl"><img className=" w-full hover:scale-[1.4] cursor-pointer transition-all " src="row12.jpg" alt="Step 2 Icon" /></div>
              <h3 className="font-semibold text-xl">Set Up Your Page</h3>
              <p>Customize your page with your content, branding, and more.</p>
            </div>
            <div className="flex flex-col items-center  justify-center gap-4 text-center shadow-lg rounded-xl w-72 h-96 p-5">
            <div className="w-48 overflow-hidden rounded-xl"><img className=" w-full hover:scale-[1.4] cursor-pointer transition-all " src="row13.jpg" alt="Step 3 Icon" /></div>
              <h3 className="font-semibold text-xl">Share with Your Fans</h3>
              <p>Promote your page and let your fans support you.</p>
            </div>
          </div>
        </div>
        <h2 className="items-center justify-center text-center flex flex-col  text-5xl w-[70%] mx-auto font-bold h-16 border-y-[2px] border-zinc-100"><span className="px-5 border-x-[2px] flex justify-center border-zinc-100">Get info</span></h2>
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-col">
    <div className="lg:w-4/6 mx-auto">
      <div className="rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover mr-48 h-full w-full"
          src="slide1.jpg" // Replace with the actual image URL
        />
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div className="w-24 h-24 rounded-full overflow-hidden inline-flex items-center justify-center border-2 border-zinc-600 bg-gray-200 text-gray-400">
            <img  className="object-cover w-full h-full" src='c.jpg' alt="" />
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <h2 className="font-bold title-font mt-4 text-2xl text-gray-900">Sensit</h2>
            <p className="text-[10px]">(Founder of Sugar Ready)</p>
            <div className="w-12 h-1 bg-[#68972C] rounded mt-2 mb-4"></div>
            <p className="text-base">
              Share a brief description about yourself, your journey, or your mission related to "Sugar Ready." For example, "Empowering creators to take charge of their careers through seamless financial support and subscriptions."
            </p>
          </div>
        </div>
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p className="leading-relaxed text-lg mb-4">
            Provide a detailed description of how "Sugar Ready" helps creators like you. Talk about the features, benefits, or unique selling points of your platform. For example, "With Sugar Ready, creators can easily set up their personalized pages, engage with fans, and monetize their content effortlessly. Whether you’re an artist, writer, or musician, our platform is designed to help you grow your audience and get paid for doing what you love."
          </p>
          <a href="/About" className="text-[#68972C] hover:underline hover:text-[#2e4116] inline-flex items-center">
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* 3rd Section */}
        <div className="border-t-[2px] border-zinc-100 w-full py-5 px-[10%]">
          <h2 className="text-center text-5xl font-bold py-5 border-y-[2px] border-zinc-100">Testimonials</h2>
          <div className="mt-10 flex justify-center flex-wrap items-center gap-5">
            <div className="flex flex-col items-center text-center rounded-lg shadow-lg bg-zinc-50 w-72 h-72 p-5">
              <img className="w-24 h-24 rounded-full" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="User 1" />
              <p className="mt-4">"This platform has transformed my creative journey. I can now focus on my art full-time!"</p>
              <p className="mt-2 font-bold">- Jane Doe</p>
            </div>
            <div className="flex flex-col items-center text-center rounded-lg shadow-lg bg-zinc-50 w-72 h-72 p-5">
              <img className="w-24 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDNH4yV8JgBa6G2XMCXzDJB6zP2edr2_VYPEp3QIkGLaUbswx_K5agwBAGP-zAowzoerw&usqp=CAU" alt="User 2" />
              <p className="mt-4">"Thanks to this service, I’ve been able to grow my audience and get paid for doing what I love."</p>
              <p className="mt-2 font-bold">- John Smith</p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
