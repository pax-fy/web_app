import { IPFS_GATEWAY2 } from '@/assets/constant'
import React, {useState} from 'react'
import { useToast } from "@/components/ui/use-toast"

//`h-72 md:h-80 bg-[url('/img/star.svg')]
 type bannerProps = {
  avatar ? : any
  channelId? :  any
  handle? : string
  bio ? : string
  followers? : any
  channel? : any
  relations ? : any
 }

 import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ShareButtons from '../cards/Share';

export default function ChannelBanner({avatar, handle, followers, channel, channelId, relations} : bannerProps) {
  const [testTruth, settestTruth] = useState(false)
   const channelAvatar = `${IPFS_GATEWAY2}${avatar}`
  
   const constantChannelBanner = "https://ipfs.4everland.xyz/ipfs/bafkreiaybovbtmns77vevfc7dawxtth6zqfpnzo26b54u5vdyl6kh43ktm"

  
  return (
    <div className='relative z-0'>
    <div className={`h-72 bg-no-repeat bg-cover contrast-75 md:h-80 bg-[url('https://ipfs.4everland.xyz/ipfs/bafkreiaybovbtmns77vevfc7dawxtth6zqfpnzo26b54u5vdyl6kh43ktm')] `} >
        <div className='flex xs:flex-col md:flex-row justify-end py-2 px-4 gap-3  items-end z-50'>
             <div className='inline-flex max-w-[130px]  gap-2 items-center bg-gray-300 hover:bg-gray-300/70 dark:bg-zinc-800 py-2 px-4 cursor-pointer hover:dark:bg-zinc-700 rounded-xl '
               
             >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<button className=''>Support</button>
             </div>
             <>
              {relations?.isFollowing ? (
               <div className='inline-flex gap-2 items-center max-w-[130px] dark:bg-zinc-800 py-2 px-4 cursor-pointer  bg-gray-300 hover:bg-gray-300/70 hover:dark:bg-zinc-700 rounded-xl ' >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
</svg>

  <button className=''>Following</button>
               </div>
              ) : (
                <div className='inline-flex gap-2 items-center max-w-[130px] dark:bg-zinc-800 py-2 px-4 cursor-pointer  bg-gray-300 hover:bg-gray-300/70 hover:dark:bg-zinc-700 rounded-xl ' >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
<button className=''>Follow</button>
             </div>
              )}
             </>
             
  

  <Dialog>
  <DialogTrigger>
  <div className='inline-flex gap-2 items-center max-w-[130px] dark:bg-zinc-800 py-2 px-4 cursor-pointer  bg-gray-300 hover:bg-gray-300/70 hover:dark:bg-zinc-700 rounded-xl '>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>

<button className=''>Share</button>
             </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='mb-4 '>Share</DialogTitle>
      <DialogDescription>
       <ShareButtons url={`https://www.zenvid.xyz/c/${channelId}`} />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

            
        </div> 
    </div>
      <div className='absolute xs:top-[75%] md:top-[73%]  w-full bg-white/40 dark:bg-black/70 backdrop-blur-lg '>
        <div className='flex gap-3 items-center z-10'>
          <div className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'>
           <div className='w-9 h-9 border border-red-400 ronded-full'></div>
         
          </div>
  
 <div className='z-20'>
   <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>{handle}</h1>
   <h2 className='text-xs md:text-sm'>{followers} Followers</h2>
 </div>
      </div>
    </div>
 
    </div>
  )
}
