//@ts-nocheck
import React, {useState} from 'react'
import { IPFS_GATEWAY2 } from '@/assets/constant'
import { CharacterAvatar } from "@crossbell/ui";
import moment from 'moment'
import RelatedVideoCrad from '../cards/RelatedVideoCrad';
import { useDiscoverVideos } from '@/hooks/useDiscoverVideos';
import RelatedVideoLosderSkelton from '../skeletons/RelatedVideoCardSpinner';
import NoData from '../common/NoData';

export default function RelatedVideos() {
  const [isLoading, setisLoading] = useState(true)
    const {data, loading, error} = useDiscoverVideos()


     if(loading){
      return(
        <RelatedVideoLosderSkelton   />
      )
     }
     if(data?.notes?.filter(video => video.metadata?.content?.tags[0] !== "comment").length  < 4 ){
      return(
      <div className='hidden xl:flex flex-col gap-3 w-[27%] pt-7'>
   <NoData title='No related videos' isFullPage={false}  />
      </div>
      )
     }
  return (
    <div className='hidden xl:flex flex-col gap-3 w-[27%] pt-1'>
       {data?.notes?.filter(video => video.metadata?.content?.tags[0] !== "comment").map((note, i) => (
      <RelatedVideoCrad
      key={i} 
      video={note} 
      title={note?.metadata?.content?.title}
       cover={note?.metadata?.content?.attachments[0]?.name}
       channel={note?.character}
       channelId={note?.characterId}
       noteId={note.noteId}
       createdAt={note?.createdAt}
      />
      
    ))}
    </div>
  )
}
