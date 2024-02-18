import { IPFS_GATEWAY2, IPFS_GATEWAY, shortTest } from '@/assets/constant'
import { useDiscoverShorts } from '@/hooks'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
//@ts-ignore
import ShortsSkeleton from '../skeletons/ShortSkeleton'
import NoData from '../common/NoData'
export default function LatestShorts() {
  const {data, loading, error} = useDiscoverShorts()

   console.log("short videos", data)

   if(loading){
    return <ShortsSkeleton  />
   }

   if(data?.notes?.length  < 1){
    return(
      <NoData title='No Short Videos Yet' isFullPage={false}  />
    )
   }

    // lLink to specific short 

   //  /${item?.characterId }-${item.noteId}
  return (
    <div className='flex gap-x-4   '>
      {/*@ts-ignore */}
       {data?.notes?.map((item , i) => (
       <Link href={`/shorts/${item?.characterId }-${item.noteId}`} key={i}>
       <div className='h-[350px] w-[200px] rounded-lg bg-black md:w-[210px]  lg:w-[230px]'>
         <Image
           src={`${IPFS_GATEWAY}${item?.metadata?.content?.attachments[0]?.name}`}
           className='h-[350px] w-[230px] rounded-lg object-cover'
           width={230}
           height={350}
           alt='short-clip_cover'
         />
       </div>
     </Link>

       ))}
      
 
    </div>
  )
}
