import React, {useState} from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import { IPFS_GATEWAY2 } from '@/assets/constant'

type videoCardProps = {
  video? : any
  title ? : string
  cover ? : any
  channel? : any
  channelId? : any
  noteId ? : any
  createdAt? : any
 }
 //w-full h-full object-cover rounded-xl hover:animate-scaleSlow
export default function RelatedVideoCrad({video, title, cover, channel, channelId,noteId, createdAt} : videoCardProps) {

  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  const videoCreatedAt = new Date(createdAt);
  //@ts-ignore
  const diffInMilliseconds = currentDate - videoCreatedAt;
  const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
  const duration = moment.duration(diffInHours, "hours");
  return (
  
        <div  className='flex  justify-between gap-2 '>
          <div
          className='w-44 h-24   overflow-hidden  rounded-xl '
          >
            <Link href={`${channelId}-${noteId}`}>
            <div
              className='w-full h-full'
          >
             <Image
             src={`${IPFS_GATEWAY2}${cover}`}
           width={300}
           height={300}
            alt='cover'
            className='h-24 w-44 bg-gray-300 object-center dark:bg-gray-700'
/>
</div>
</Link>
          </div>
            <div className='flex-1 w-44 px-0.5 '>
              <Link href={`${channelId}-${noteId}`} className='line-clamp-2  mb-3 text-text  '>
              {title  || `Video By ${video?.character?.handle}`}
              </Link>
              <Link href={`/c/${channelId}`}>
              <h2 className='text-xs line-clamp-1'>{channel?.handle}</h2></Link>
              <p className='text-xs font-light'>{duration.humanize().replace("a ", "")} ago</p>
            </div>
       
        </div>
    
  )
}
