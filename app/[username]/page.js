'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { findUser } from '@/db/username';
import Loading from '@/components/loading';
import NotFound from '../not-found';
// stripe
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FaCamera } from 'react-icons/fa';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

// payment DB
import { updatePayment, createPayment, showPayment, ShowUser , showMessages, ShowtoUser , profilePhoto , coverPhoto } from '@/db/updateDB';
import { v4 as uuidv4 } from 'uuid';

const Username = ({ params }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [pimg, setpp] = useState(null);
  const [cimg, setcp] = useState(null);
  const [message, setMessage] = useState(<Loading />);
  const [amount, setAmount] = useState(0);
  const [oid, setOid] = useState('');
  const [mysession, setMysession] = useState('');
  const [user_messages, setUser_messages] = useState([])
  const [toUser, setToUser] = useState({})
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [msgInDiv, setMsgInDiv] = useState('message')
  const [userEarnings, setuserEarnings] = useState()
  useEffect(() => {
    setOid(uuidv4())
  }, [])
 
  useEffect(() => {
    const fetchUserData = async () => {
      let ifToUser  = await findUser(params.username)
      if (ifToUser) {
        setToUser(ifToUser)
        let showmessages = await showMessages(ifToUser.email , true)
        setUser_messages(showmessages)
      }
      if (session) {
        const a = await ShowUser(session.user.email);
        setMysession(a);
        let showmessages = await showMessages(session.user.email , true)
        let b = 0
        showmessages.map(val=>{
          b = b + parseInt(val.amount)
          setuserEarnings(b)
        })
      }
      try {
        let fetchedUser = await findUser(params.username, 'asfsaf');
        setUser(fetchedUser.username);
        setpp(fetchedUser.profile_picture);
        setcp(fetchedUser.cover_picture);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    fetchUserData();
    
    setTimeout(() => {
      setMessage(<NotFound />);
    }, 1000);
  }, [params.username, session]);

  if (params.username !== user) {
    return message;
  }

  const onSubmit = async (data) => {
    if (mysession.email !== toUser.email){
    const { amount, msg, name } = data;
    if (session) {
      if(toUser.email){
        const b = await showPayment(session.user.email);
      if (b.length > 0) {
        let passed = b[b.length - 1].done;
        if (passed === true) {
          setAmount(amount);
          await createPayment(session.user.email,mysession.username, toUser.email, oid, msg, amount, false);
        } else {
          setAmount(amount);
          await updatePayment(session.user.email,mysession.username, toUser.email, oid, msg, amount, false);
        }
      } else {
        setAmount(amount);
        await createPayment(session.user.email,mysession.username, toUser.email, oid, msg, amount, false);
      }
    }
  } else {
    alert('Login to pay');
  }
}
  };

  const handleFileChange = (e, type) => {
    if (session) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async() => {
        if (type === 'profile') {
            let a = reader.result
            let img = await profilePhoto(session.user.email , a);
            let fetchedUser = await ShowtoUser(session.user.email);
            setpp(fetchedUser.profile_picture);
        } else if (type === 'cover') {
          let a = reader.result
          let img = await coverPhoto(session.user.email, a );
          let fetchedUser = await ShowtoUser(session.user.email);
            setcp(fetchedUser.cover_picture)
        }
      };
      reader.readAsDataURL(file);
    }
  }
  };

  return (
    <>
      <div className="">
        <div className="cover w-full h-[350px] relative bg-red-50">
          <img className='object-cover absolute w-full h-full ' src={cimg} alt="" />
          {session && mysession.username === params.username && <div className="z-40 h-full absolute w-full  flex items-end text-xl  justify-end pb-3 pr-3">
            <label >
              <div className='bg-[#c7c7c7] p-1.5 rounded-full cursor-pointer'><FaCamera /></div>
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'cover')} />
            </label>
          </div>}
        </div>
        <div className="w-28 h-28 mx-auto relative -top-11 rounded-full border-gray-500 border-[1px]">
          <div className="profile_photo h-full w-full rounded-full overflow-hidden bg-gray-100 border-white border-4">
            <a href={pimg} target='_blank'><img className="h-full w-full object-cover" src={pimg} alt="" /></a>
          </div>
          {session && mysession.username === params.username && (
            <div className="z-40 absolute bottom-0 right-0 flex items-center justify-center pb-2 pr-2">
              <label>
                <div className="bg-[#c7c7c7] p-1.5 rounded-full cursor-pointer">
                  <FaCamera />
                </div>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'profile')} />
              </label>
            </div>
          )}
      </div>

        <div className="username text-center flex text-2xl font-bold  items-center justify-center relative -top-10">
          {toUser.name || 'unknown'}
          {session && mysession.username == params.username  && <span className='font-extralight text-xs absolute translate-x-[120px] '>(Your Account!)</span>}
        </div>
        <div className="username text-center relative -top-10">
        @{params.username}
        </div>
        <div className="Desc text-center relative -top-10 text-zinc-500">
          <p>A passionate developer</p>
          <p className='text-sm'>999 Followers • 69 Likes • 2 Following</p>
          {session && mysession.username === params.username && <p className='text-md font-bold mt-3 text-green-500'>Total earnings: ${userEarnings}</p>}
        </div>
        <div className="w-[90%] justify-center lg:items-start mx-auto flex flex-wrap lg:flex-nowrap gap-20">
          <div className="payments w-[70%] lg:w-[50%] flex flex-col gap-2 rounded-xl bg-gray-200 p-5 shadow-md">
            <h1 className='text-2xl font-semibold'>Supporters</h1>
            <ul>
              {user_messages.map((val , key)=>{
                return (
                  <li className='flex flex-wrap gap-1' key={key}>{val.name} donated <b className='text-green-700'>${val.amount}</b> {val.message.length > 0 && <span><span className='ml-2 font-medium'>message: </span><span className='italic text-sm'>{val.message}</span></span>}</li>
                )
              })}
                            
            </ul>
          </div>
          {session && mysession.username !== params.username &&<div className="makePayments w-[70%] lg:w-[30%] rounded-xl gap-2 bg-gray-200 p-5 shadow-md flex flex-col">
              <img className='' src="debit.png" alt="" />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <input
                {...register('amount', {
                  required: 'Amount is required',
                  min: {
                    value: 5,
                    message: 'Minimum amount is $5'
                  },
                  valueAsNumber: true
                })}
                placeholder='Amount'
                className='py-1 px-3 text-md rounded-full shadow-sm outline-none focus:border-[1px] border-black'
                type="number"
              />
              {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
              <input {...register('msg')} placeholder='Message' className='py-1 px-3 text-md rounded-full shadow-sm outline-none focus:border-[1px] border-black' type="text" />
              <button type="submit" className='py-1 px-3 text-md rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all text-white shadow-sm'>
                Pay
              </button>
              <div className="flex gap-2 mt-2 ml-2">
                <button type="button" onClick={() => setValue('amount', 5)} className='p-1 text-md rounded-md cursor-pointer font-semibold text-[13px] bg-blue-500 hover:bg-blue-600 transition-all text-white shadow-sm'>
                  $5
                </button>
                <button type="button" onClick={() => setValue('amount', 10)} className='p-1 text-md rounded-md cursor-pointer font-semibold text-[13px] bg-blue-500 hover:bg-blue-600 transition-all text-white shadow-sm'>
                  $10
                </button>
                <button type="button" onClick={() => setValue('amount', 20)} className='p-1 text-md rounded-md cursor-pointer font-semibold text-[13px] bg-blue-500 hover:bg-blue-600 transition-all text-white shadow-sm'>
                  $20
                </button>
                <button type="button" onClick={() => setValue('amount', 30)} className='p-1 text-md rounded-md cursor-pointer font-semibold text-[13px] bg-blue-500 hover:bg-blue-600 transition-all text-white shadow-sm'>
                  $30
                </button>
              </div>
            </form>
          </div>}
          {amount >= 5 && <div className="w-fit font-semibold top-36 fixed rounded-lg z-40 p-5 bg-[#ffffffd2] shadow-md backdrop-blur-sm">
            <div className="">
            <div onClick={() => { setAmount(0) }} className="flex w-full justify-end pb-4 ">
              <svg className='cursor-pointer hover:backdrop-invert-0 ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
              </svg>
            </div>
          </div>
            <div className="w-full rounded-lg font-bold mb-10 text-white text-4xl bg-blue-500 hover:bg-blue-600 transition-all px-5 py-3 text-center">Stripe</div>
            
            <Elements
              stripe={stripePromise}
              options={{
                mode: 'payment',
                amount: convertToSubcurrency(amount),
                currency: 'usd'
              }}
            >
              <CheckoutPage amount={amount} username={params.username} oid={oid} />
            </Elements>
          </div>}
        </div>
      </div>
    </>
  );
};

export default Username;
