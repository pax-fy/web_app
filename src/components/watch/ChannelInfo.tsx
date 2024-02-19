import React, {useState} from 'react'
import { useRouter } from 'next/router';


type  channelProps = {
    channel?:  any
}
export default function ChannelInfo({channel}: channelProps) {

  const [testTruth, settestTruth] = useState(true)

  const router = useRouter();

    console.log("the channel  stats", channel)
  return (
    <div className='flex justify-between items-center my-3'>
        <div className='flex gap-2 items-center'>
        <div className='w-10 h-10 rounded-full sm:w-14 sm:h-14 lg:w-20 lg:h-20 shadow-2xl '>
        <div className='w-full h-full bg-purple-400 border border-red-400 flex text-2xl items-center justify-center font-extrabold rounded-full text-white'>
              P
           </div>
        </div>
        <div>
             <h1 className='text-sm font-semibold md:font-normal text-muted hover:text-rose-600 md:text-lg'>{channel?.handle}</h1>
              <p className='text-xs md:text-sm'>10 Followers</p>
        </div>
        </div>
        <>
          {
            testTruth ? (
              <div className='bg-background-primary flex gap-3 items-center py-2 px-4 rounded-xl cursor-pointer text-white'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
</svg>

<p className='text-sm md:text-lg'>Following</p>
   </div>
            ) : (
              <div className='bg-background-primary flex gap-3 items-center py-2 px-4 rounded-xl cursor-pointer text-white' >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
           </svg>
           
           <p className='text-sm md:text-lg'>Follow</p>
              </div>
            )
          }
        </>
  
    </div>
  )
}
