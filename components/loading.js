import React from 'react'

const loading = () => {
  return (
    <div className="">
    <div className="cover w-full bg-red-50">
      <div role="status" className="flex items-center justify-center h-[350px] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    <div className="profile_photo overflow-hidden w-28 h-2w-28 mx-auto relative -top-11 rounded-full border-black border-2 bg-white">
      
<div role="status" className="animate-pulse">
    
    <div className="flex items-center justify-center">
    <svg className="h-full w-full text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
    </div>
    <span className="sr-only">Loading...</span>
</div>

    </div>
    <div className="username flex items-center text-center justify-center font-bold relative -top-10">
    <div role="status" className="text-center flex flex-col gap-2 items-center justify-center animate-pulse">
      <div className="text-center flex items-center justify-center h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
      <div className="text-center flex items-center justify-center h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div className="text-center flex items-center justify-center h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
      <span className="sr-only text-center flex items-center justify-center">Loading...</span>
    </div>
    </div>
    <div className="w-[90%] justify-center lg:items-start mx-auto flex flex-wrap lg:flex-nowrap gap-4">
      <div className="payments w-[70%] lg:w-[50%] flex flex-col gap-2 rounded-xl bg-gray-200 p-5 shadow-md">
        <h1 className='text-2xl font-semibold'>Supporters</h1>
        <ul>
        <div role="status" className="text-center flex flex-col gap-4 items-center justify-center animate-pulse">
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <span className="sr-only text-center flex items-center justify-center">Loading...</span>
      </div>
        </ul>
      </div>
      <div className="makePayments w-[70%] lg:w-[50%] rounded-xl gap-2 bg-gray-200 p-5 shadow-md flex flex-col">
      <div role="status" className="text-center flex flex-col gap-4 items-center justify-center animate-pulse">
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="text-center flex items-center justify-center h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          <span className="sr-only text-center flex items-center justify-center">Loading...</span>
      </div>
      </div>
    </div>
  </div>
  )
}

export default loading