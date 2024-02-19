import Image from 'next/image'
import React, {useState} from 'react'
import {motion} from 'framer-motion'
import { IPFS_GATEWAY2, base64File } from '@/assets/constant'
import moment from 'moment'
import Link from 'next/link';



 type videoCardProps = {
  video? : any
  title ? : string
  cover ? : any
  channel? : any
  channelId? : any
  noteId ? : any
  createdAt? : any
 }
 //xs:w-11/12 mx-auto xs:h-80 sm:h-96 md:w-64 md:h-[16.75rem]
export default  function  VideoCard({cover, channel, channelId, noteId, createdAt, title} : videoCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  const videoCreatedAt = new Date(createdAt);
  console.log("the channel contents", channel)
  //@ts-ignore
  const diffInMilliseconds = currentDate - videoCreatedAt;
  const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
  const duration = moment.duration(diffInHours, "hours");
  return (
    <div className={`  aspect-[16/9]   rounded-xl `}>
        <div className='hover:text-rose-400/90'>
          <Link href={`/watch/${channelId}-${noteId}`}>
        <div className=' rounded-md  md:rounded-xl overflow-hidden cursor-pointer'>
  <Image
       src={`${IPFS_GATEWAY2}${cover}`} 
       width={1000}
       height={600}
       alt='image cover'
       className=' w-full h-full  '
       
    
  />

  
  </div> 
         </Link>
         </div>

         <div className='flex  space-x-3 py-2 '>
         
         <div className='w-7 h-7 bg-purple-400 border border-red-400 flex items-center justify-center font-extrabold rounded-full text-white'>
              P
           </div>
         
          <div>
          <Link className="line-clamp-2 break-words font-bold" href={`/watch/${channelId}-${noteId}`}>
                {title || `Video by ${channel?.metadata?.content?.name}`}
              </Link>
          <div   className='flex space-x-3 items-center  text-xs  pt-0.5 ' >
           <Link href={`/c/${channelId}`}>{channel?.handle}</Link> 
            <div className='flex space-x-1 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 hidden">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

<p>  {duration.humanize().replace('a ', '')} ago</p>
            </div>
         </div>
           </div>
         </div>
         
    </div>
  )
}

