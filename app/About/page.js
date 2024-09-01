import React from 'react'

const About = () => {

  return (
    <div className="bg-black w-full h-[600px] pt-10 flex  justify-evenly">
        <div className="flex h-full w-[50%] bottom-0  justify-center">
        <div className="absolute ml-3 bg-white mt-44 w-[420px] h-[320px]  rounded-t-full"></div>
        <img className='absolute w-[500px] ' src="me.png" alt="" />
        </div>
        <div className="h-full w-[50%] py-20 flex flex-col gap-20 ">
            <h1 className='text-white'><p className=' text-5xl font-extrabold'>Zain Ahmad</p> <p className='text-white text-sm font-extralight'>(Founder of Sugar ready)</p></h1>
            <p className='text-white text-xl'>
                At Sugar Ready, we are passionate about empowering creators and building vibrant communities around their work.
                Our platform is dedicated to helping creators turn their passions into sustainable careers by providing them with
                 the tools and support they need to succeed. We believe that every creator deserves recognition and financial
                 support for their dedication and talent.
            </p>
        </div>
    </div>
  )
}

export default About