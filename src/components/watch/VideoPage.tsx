import { IPFS_GATEWAY2 } from '@/assets/constant'
import { GET_VIDEO_BY_ID } from '@/graphql/fragments/getVideoById'
import { useQuery } from '@apollo/client'
import { Player } from '@livepeer/react'
import Image from 'next/image'
import React, {useState} from 'react'
import RelatedVideos from '../relatedVids/RelatedVideos'
import FullVideoStats from './FullVideoStats'
import { useQuery as useFetch  } from '@tanstack/react-query'
import ChannelInfo from './ChannelInfo'
import Comments from './Comments'
import axios from 'axios'

import VideoPlayer from '../VideoPlayer'
import VideoFullSkeleton from '../skeletons/FullVideoSkeleton'
type videoPageProps = {
   videoUri? : any
   videoTitle? : any
   videoCover? : any
   channelId ? : any
   channelInfo ? : any
   createdAt? : any
   videoId ?: any
   totalTips? : any
   Stats ? : any 
   vidStats?: any
   loading? : any
}
export default function VideoPage({
    vidStats,
     videoCover, 
     videoId, videoTitle, 
     videoUri,channelId, channelInfo, 
     totalTips,
     loading, createdAt
    } : videoPageProps) {
      const [isSensitiveContent, setisSensitiveContent] = useState(false)
   const [isLoading, setisLoading] = useState(true)


    //  FTECH VIDEO  COMMENTS
    const COMMENTS_BASE_URL = `https://indexer.crossbell.io/v1/notes?limit=20&toCharacterId=${channelId}&toNoteId=${videoId}&includeDeleted=false&includeEmptyMetadata=false&includeCharacter=true&includeHeadCharacter=false&includeHeadNote=false&includeNestedNotes=true`;
     
    const fetchvideoComments = async () => {
        return axios.get(COMMENTS_BASE_URL);
      };

      const {
        data: comments,
        isLoading: isCommentsLoading,
        isError: isCommentsError,
        error: commentsError,
      } = useFetch(["comments-data"], fetchvideoComments);
      console.log("video comments", comments);

      const refCallback = (ref: HTMLMediaElement) => {
        if (ref) {
          ref.autoplay = true
        }
      }

   

        const PosterImage = () => {
            return (
              <Image
                src={`${IPFS_GATEWAY2}${videoCover}`}
                layout="fill"
                objectFit="cover"
                priority
               
                alt='cover'
              />
            );
          };

  
          if(loading) {
            return(
           <VideoFullSkeleton  />
            )
          }
  return (
    <div className='w-full '>
    <div className='flex gap-2 w-full'>
      <div className='  w-full  xl:w-[95%]  xl:mx-1  mx-auto md:pt-1   '>
    
    <VideoPlayer
   address={`0x0`}
   refCallback={refCallback}
  // currentTime={videoWatchTime}
   playbackId={videoUri}
   posterUrl={`${IPFS_GATEWAY2}${videoCover}`}
   options={{
     loadingSpinner: true,
     isCurrentlyShown: true
   }}
   isSensitiveContent={isSensitiveContent}
   //shouldUpload={getShouldUploadVideo(video)}

  />
    <div className='mt-4 px-2'>
        <h1 className='text-lg sm:text-xl md:text-2xl text-text '>{videoTitle}</h1>

         <div>
        <FullVideoStats 
          stats={vidStats}
          tips={totalTips}
          videId={videoId}
          createdAt={createdAt}
          likes={3}
          isLiked={true}
          note={{ characterId: channelId, noteId: videoId}}
        />
         </div>
         <div>
          <ChannelInfo  channel={channelInfo} />
         </div>
          <div>
             <Comments videoId={videoId} profileId={channelId} comments={comments}
               loading={isCommentsLoading}
             />
          </div>
    </div>
    </div>
    <RelatedVideos   />
    </div>
   
    </div>
  )
}
