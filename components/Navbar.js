'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import { ShowUser } from '@/db/updateDB';
import { useRouter } from 'next/navigation';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const url_path = usePathname();
    const { data: session ,status } = useSession()
    const router = useRouter()
    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/Login');
      }
    }, [status, router]);

    const [UserLink, setUserLink] = useState({})
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
      window.addEventListener('scroll', () => {
        let aa = document.querySelector('.aa')
        if (window.scrollY === 0) {
          if (aa) { 
            aa.style.boxShadow = 'none';
          }
        }
        else if(window.scrollY > 0){
          if (aa) {
            aa.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }
      }
      })
    }, [])
    
    useEffect(() => {
      if (session) {
          const fetchUserData = async () => {
              const fetchedUser = await ShowUser(session.user.email);
              if(fetchedUser){
              setUserLink(fetchedUser);
              }
          };
          fetchUserData();
      }
  }, [session]);
  const asd =(e)=>{
    e.preventDefault()
    let a = document.getElementsByClassName('aa')[0].value
    router.push(`/${a}`)
  }
  return (
    <>
    <nav className=" bg-[#ffffff76] border-b-[1px] border-zinc-200  pb-1 dark:bg-gray-900 z-50 sticky top-0 backdrop-blur-sm">
      <div className="nav-logo max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className=" transition-all p-2 flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logoo.png" className="h-16" alt="Sugar Ready Logo" />
        </Link>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isMenuOpen ? '' : 'hidden'} w-full lg:block lg:w-auto`} id="navbar-default">
          <ul className="font-medium flex lg:items-center flex-col p-4 lg:p-0 mt-4 border-t border-gray-300  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
            <Link href="/" onClick={()=>{setIsMenuOpen(false)}} className={url_path === '/' ? "block py-2 px-3 text-black bg-[#49780D] rounded lg:bg-transparent lg:text-[#49780D] lg:p-0 dark:text-white underline_style" : "underline_style block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#49780D] lg:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"}>Home</Link>
            </li>
            <li>
              <Link href="/About" onClick={()=>{setIsMenuOpen(false)}} className={url_path === '/About' ? "block py-2 px-3 text-black bg-[#49780D] rounded lg:bg-transparent lg:text-[#49780D] lg:p-0 dark:text-white underline_style" : "underline_style block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#49780D] lg:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"}>About</Link>
            </li>
            {session ? <>
            <li>
              <Link href="/Projects" onClick={()=>{setIsMenuOpen(false)}} className={url_path === '/Projects' ? "block py-2 px-3 text-black bg-[#49780D] rounded lg:bg-transparent lg:text-[#49780D] lg:p-0 dark:text-white underline_style" : "underline_style block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#49780D] lg:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"}>Projects</Link>
            </li>
            <li>
            <Link href="/Dashboard" onClick={()=>{setIsMenuOpen(false)}} className={url_path === '/Dashboard' ? "block py-2 px-3 text-black bg-[#49780D] rounded lg:bg-transparent lg:text-[#49780D] lg:p-0 dark:text-white underline_style" : "underline_style block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#49780D] lg:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"}>Dashboard</Link>
            </li>
            <li>
            <div onClick={()=>{signOut()}} className="cursor-pointer hover:text-red-500 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-500 lg:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Signout</div>
            </li>
            <li className="mt-2 pt-3 lg:pt-0 lg:mt-0 flex items-center ">
              <Link href={`/${UserLink.username}`}>
                 <div className="w-10 h-10 overflow-hidden  border-[1px] border-zinc-500 rounded-full">
                 <img className="object-cover w-full h-full" src={UserLink.profile_picture} alt={`${UserLink.username} profile`} />
                 </div>
              </Link>
              <Link href={`/${UserLink.username}`} className="cursor-pointer lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-500 lg:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                {UserLink.username}
              </Link>
            </li>

            </> : <li>
            <Link href="/Login" className={url_path === '/Login' ? "block py-2 px-3 text-black bg-[#49780D] rounded lg:bg-transparent lg:text-[#49780D] lg:p-0 dark:text-white underline_style" : "underline_style block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#49780D] lg:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"}>Login</Link>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
    <form onSubmit={asd} className="max-w-md mx-auto my-2">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="outline-none aa block w-full p-4 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-black  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-blue-800">Search</button>
    </div>
</form>
    </>
  );
};

export default Navbar