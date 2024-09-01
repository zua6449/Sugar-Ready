'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createProject, DeletePost, EditPost, fetchProject} from '@/db/updateProjects';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';
import { MdFileUpload , MdDelete , MdOutlineModeEdit } from "react-icons/md";

const Portfolios = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/Login');
    }
  }, [status, router]);

  const { register, unregister, handleSubmit, setValue, watch, formState: { errors, isValid }, trigger } = useForm({ mode: 'onChange' });
  const [step, setStep] = useState(1);  // To track the current step
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const category = watch('category');
  const [data_array, setdata_array] = useState([])
  const [tp, setTp] = useState('')
  useEffect(() => {
    if(session){
      let a = async()=>{
        let data = await fetchProject(session && session.user.email)
        if(data){
          setdata_array(data)
        }
      }
      a()
    }
  }, [session])
  
  useEffect(() => {
    if (category === 'others') {
      setHidden(false);
      register('additionalCategory', { required: true });
    } else {
      setHidden(true);
      unregister('additionalCategory');
    }
  }, [category, register, unregister]);

  const nextStep = async () => {
    const isValidStep = await trigger();
    if (isValidStep) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => setStep(prevStep => prevStep - 1);

  const handleChange = (e) => {
    console.log(e)
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
const onSubmit = async (data) => {
  data.thumbnailImg = tp
    if (session) {
      if (data.category === 'others') {
        data.category = data.additionalCategory;
      }
      const result = await createProject(session.user.email, data.title, data.category, data.description, data.portfolioLink, data.videoLink || null, data.thumbnailImg);
      setValue('postedBy', '');
      setValue('title', '');
      setValue('category', '');
      setValue('description', '');
      setValue('portfolioLink', '');
      setValue('videoLink', '');
      setValue('thumbnailImg', '');
      setStep(1)
      setHidden2(true);
    }
    let a = await fetchProject(session.user.email)
    setdata_array(a)
  };

  const crossClear = () => {
    setValue('postedBy', '');
    setValue('title', '');
    setValue('category', '');
    setValue('description', '');
    setValue('portfolioLink', '');
    setValue('videoLink', '');
    setValue('thumbnailImg', '');
    setHidden2(true);
    setStep(1)
    
  };
  const handlePortEdit = async(id) =>{
    setHidden2(false)
    let data = await EditPost(id)
    setValue('postedBy', data.postedBy);
    setValue('title', data.title);
    setValue('category', data.category);
    setValue('description', data.description);
    setValue('portfolioLink', data.portfolioLink);
    setValue('videoLink', data.videoLink);
    setTp(data.thumbnailImg)
    await DeletePost(id)
  }
  const handlePortDelete = async(id) =>{
    await DeletePost(id)
    let data = await fetchProject(session && session.user.email)
        setdata_array(data)
  }


  if (status === 'loading') {
    return <div className='w-full h-screen flex justify-center items-center'>
      <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }

  return (
    <div className="w-full mt-5 max-h-full min-h-[150vh]">
      <div className="w-full flex flex-col items-center gap-5">
        <h1 className='text-6xl font-extrabold'>My Portfolio</h1>
        <h1 onClick={() => { setHidden2(false) }} className='text-xl text-white bg-black py-2 px-4 rounded-full cursor-pointer'><span className='font-bold'>+</span> Add New Portfolio</h1>
        {!hidden2 && <div className="bg-[black] absolute h-[420px] w-96 z-10 mx-auto top-40 shadow-md border-2 border-zinc-500  rounded-lg  flex flex-col">
          <img className='object-cover absolute -z-10 h-full w-full rounded-lg ' src="https://png.pngtree.com/thumb_back/fh260/background/20190927/pngtree-white-abstract-geometric-background-with-blocks-image_317808.jpg" alt="" />
          <div className="pt-5 p-10 gap-5  bg-[#00000050]h-full">
          <h1  className='text-2xl cursor-pointer font-extrabold text-black hover:text-red-500 w-full flex justify-end'><RxCross1 onClick={crossClear} className='bg-white rounded-full p-1'/></h1>
          <h1 className='text-4xl font-extrabold text-shadow-md'>Fill to Import Your Portfolio</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {step === 1 && (
              <>
                <label htmlFor="category" className="font-medium text-nowrap text-lg">Select Category:</label>
                <select id="category" {...register('category', { required: true })} className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5">
                  <option value="" disabled>Choose a category</option>
                  <option value="GitHub">GitHub</option>
                  <option value="GitLab">GitLab</option>
                  <option value="Bitbucket">Bitbucket</option>
                  <option value="GitKraken">GitKraken</option>
                  <option value="SourceForge">SourceForge</option>
                  <option value="AWS CodeCommit">AWS CodeCommit</option>
                  <option value="Google Cloud Source Repositories">Google Cloud Source Repositories</option>
                  <option value="Azure DevOps Repos">Azure DevOps Repos</option>
                  <option value="GitBucket">GitBucket</option>
                  <option value="Gitea">Gitea</option>
                  <option value="Codeberg">Codeberg</option>
                  <option value="Launchpad">Launchpad</option>
                  <option value="Phabricator">Phabricator</option>
                  <option value="Perforce">Perforce</option>
                  <option value="Assembla">Assembla</option>
                  <option value="Plastic SCM">Plastic SCM</option>
                  <option value="Beanstalk">Beanstalk</option>
                  <option value="Pagure">Pagure</option>
                  <option value="RhodeCode">RhodeCode</option>
                  <option value="Sr.ht">Sr.ht</option>
                  <option value="Phabricator">Phabricator</option>
                  <option value="Assembla">Assembla</option>
                  <option value="Codebase">Codebase</option>
                  <option value="Launchpad">Launchpad</option>
                  <option value="Beanstalk">Beanstalk</option>
                  <option value="Perforce Helix Core">Perforce Helix Core</option>
                  <option value="RhodeCode">RhodeCode</option>
                  <option value="Sourcehut">Sourcehut</option>
                  <option value="Gogs">Gogs</option>
                  <option value="Codeberg">Codeberg</option>
                  <option className='font-semibold text-xl text-white bg-zinc-600' value="others">Others</option>
                </select>
                {errors.category && <p className="text-red-500">*category is required.</p>}
                {!hidden && (
                  <div className='gap-5 flex flex-col'>
                    <label htmlFor="additionalCategory" className="font-medium text-lg">Type Category: <span className='text-sm font-light text-zinc-400'>*required</span></label>
                    <input id="additionalCategory" placeholder='category...' {...register('additionalCategory', { required: { value: true, message: 'category is required' } })} className='outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5' />
                    {errors.additionalCategory && <p className="text-red-500">*{errors.additionalCategory.message}.</p>}
                  </div>
                )}
                <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <label htmlFor="title" className="font-medium text-lg">Portfolio Title: <span className='text-sm font-light text-zinc-400'>*required</span></label>
                <input id="title" placeholder='title...' {...register('title', { required: { value: true, message: 'title is required' } })} className='outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5' />
                {errors.title && <p className="text-red-500">*{errors.title.message}.</p>}
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                  <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <label htmlFor="description" className="font-medium text-lg">Portfolio Description: <span className='text-sm font-light text-zinc-400'>*required</span></label>
                <input id="description" placeholder='description...' {...register('description', { required: { value: true, message: 'description is required' } })} className='outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5' />
                {errors.description && <p className="text-red-500">*{errors.description.message}.</p>}
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                  <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <label htmlFor="portfolioLink" className="font-medium text-lg">Paste Portfolio Link: <span className='text-sm font-light text-zinc-400'>*required</span></label>
                <input id="portfolioLink" placeholder='link...' {...register('portfolioLink', { required: { value: true, message: 'Link is required' }, pattern: { value: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/, message: "Invalid link format" } })} className='outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5' />
                {errors.portfolioLink && <p className="text-red-500">{errors.portfolioLink.message}</p>}
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                  <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <label htmlFor="videoLink" className="font-medium text-lg">Paste Video Link <span className='text-sm font-light text-zinc-400'>*or leave empty</span></label>
                <input id="videoLink" placeholder='link...' {...register('videoLink', { pattern: { value: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/, message: "Invalid link format" } })} className='outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5' />
                {errors.videoLink && <p className="text-red-500">{errors.videoLink.message}</p>}
                or
                <div className="">
                <label htmlFor="thumbnailImg'" className="font-medium text-lg">Upload Thumbnail <span className='text-sm font-light text-zinc-400'>*required</span>
                </label>
                </div>
                <label className='-mt-2'>
                <input onChange={(e) => handleChange(e)} type='file' hidden/>
                <MdFileUpload className='text-4xl cursor-pointer hover:text-green-500' />
                </label>
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
                </div>
              </>
            )}
          </form>
          
        </div>
        </div>}
      </div>
      <div className="mt-16 flex w-full flex-wrap gap-5 p-5 pt-16 border-t-2 border-[grey">
      {/* Row 2 data*/}
      {session && data_array.map((items,index) =>{
        return (
          <div key={index} className="max-w-sm w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full h-48 rounded-t-lg overflow-hidden">
                  <img className="object-cover h-full w-full" src={items.thumbnailImg || 'https://via.placeholder.com/800x400?text=No+Thumbnail'} alt="" />
                </div>
            <div className="py-5 px-2">
                    <h5 className=" text-sm font-light tracking-tight text-gray-900 dark:text-white">Plateform ({items.category})</h5>
                    <h5 className="text-[#68972C] mb-2 text-4xl font-bold tracking-tight dark:text-white">{items.title}</h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{items.description}</p>
                    <div className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">Tutorial: <a className='text-sm font-normal italic text-blue-500 underline' target='_blank' href={items.videoLink || ''} >Link</a></div>
                <a href={items.portfolioLink} target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#68972C] rounded-lg">
                    Go to Link
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
                <div className="px-2 flex mb-1 justify-between pr-2 items-center">
                  <div className="italic font-light text-zinc-600 text-xs">({items.createdAt.toLocaleDateString()})</div>
                  <div className=" text-xl flex ">
                    <MdDelete onClick={()=>{handlePortDelete(items._id)}} className='cursor-pointer hover:text-red-500'/>
                    <MdOutlineModeEdit onClick={()=>{handlePortEdit(items._id)}} className='cursor-pointer hover:text-green-500'/>
                  </div>
                </div>

            </div>
        )
      })}
      </div>
    </div>
  );
};

export default Portfolios;
