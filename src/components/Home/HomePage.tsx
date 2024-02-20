
//@ts-nocheck
import React, {useState, useEffect} from 'react'
import { VideoCard } from '../cards'
import { fakeArray, fakeArray_2, shortTest } from '@/assets/constant'
import { useDiscoverVideos } from '@/hooks/useDiscoverVideos'
import VideoCardSpinner from '../skeletons/VideoCardSpinner'
import Image from 'next/image'
import { installApp, isInstallAvailable} from '@/lib/install'
import Button from '../common/Button'
import Input from '../common/inputs/Input'
import TopSection from '../TopSection/TopSection'
import LatestShorts from '../TopSection/LatestShorts'
import ShortsSkeleton from '../skeletons/ShortSkeleton'
import NoData from '../common/NoData'
import { APP_ID } from '@/assets/constant'
import axios from 'axios'
  // flex gap-4 flex-wrap md:px-1
import Link from 'next/link'
import { useUserContext } from '@/providers/UserContext'

import { useGetAllVideos } from '@/hooks/useGetAllVideos'
import Modal from '../common/Modal'
import CreateHandleModal from '../common/CreateHandleModal'

//import { useUserContext } from '@/providers/UserContext'


  // data?.notes?.length > 1 && data?.notes?.filter(video => video.metadata?.content?.tags[0] !== "comment").map((note, i) =>
export default function HomePage() {
  const {data, loading, error} = useDiscoverVideos()
  const [testTruth, settestTruth] = useState(false)
const [allFilterePosts, setallFilterePosts] = useState([])
const [allPostswMetadata, setallPostswMetadata] = useState({})
   const {allVids, allVidsLoading, allVidsError} = useGetAllVideos()
  const {primaryProfile, isShowHandleModal, toggleHandleModal, userAddress} = useUserContext()
     console.log("see all videos  with metadata", allPostswMetadata)
     console.log("see all  filtered videos  ", allFilterePosts)


     console.log("the primary profile", primaryProfile)
  
   


         // Function to fetch metadata for a given CID
  const fetchMetadata = async (cid) => {
    try {
      const response = await fetch(`https://ipfs.subsocial.network/ipfs/${cid}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching metadata for CID:', cid, error);
      return {}; // Return empty object in case of error
    }
  };
       const getMetadata = async () => {

           // Check if allVids or allVids.posts is not yet available
  if (!allVids || !allVids.posts) {
    console.error("Posts data not available yet");
    return;
  }
     // Fetch post metadata for each post
     const postsWithMetadata = await Promise?.all(allVids?.posts?.map(async post => {
      const metadata = await fetchMetadata(post.contentURI);
      return { ...post, metadata };
    }));

       setallPostswMetadata(postsWithMetadata)
     // Filter posts based on the source parameter in metadata
  const filteredPosts = postsWithMetadata.filter(post =>
    post.metadata.source === APP_ID && post.metadata.cover !== "DEMO CONTENT"
  );

  setallFilterePosts(filteredPosts)

    console.log("all filtered  posts", filteredPosts)
     console.log("the posts with metadta", postsWithMetadata)
       }

       //console.log("filitooooo", getMetadata())

       useEffect(() => {
   
          getMetadata();
       
        
      }, [allVids]);

      useEffect(() => {
      if(  userAddress && ! primaryProfile){
       toggleHandleModal()
      }
      }, [primaryProfile])
      
     
       


if(allVidsLoading){
  return(
    <div className='flex flex-col gap-3 w-full '>
      <ShortsSkeleton  />
<VideoCardSpinner />
    </div>

  )
 }

   if(allVidsError){
    return(
      <p>something went wrong</p>
    )
   }
    
  return (
    <div className='w-full '>
    
     <TopSection  />
   
     {allFilterePosts.length  < 0 && (
      <div className='border-t border-border-gray'>
  <NoData title='No  Videos Yet' isFullPage={true}  />
  </div>
     )}

    <div className='2xl:grid-cols-6 grid-col-1 xl:grid-cols-4 sm:grid-cols-3 grid gap-x-4 gap-y-2 sm:gap-y-6 px-1 md:px-2'>
     
    {
      allFilterePosts?.map((video, i) => (
        <VideoCard 
        key={i} 
        video={video} 
        title={video?.metadata?.title}
         cover={video?.metadata?.cover}
         channel={video?.profile}
         channelId={video?.profile?.id}
         noteId={video?.id}
         createdAt={"wait"}
        />
      ))
    }

   
   
    </div>

 {
  ! primaryProfile  &&  userAddress &&
  <Modal isOpen={isShowHandleModal} closeModal={toggleHandleModal} >
    <CreateHandleModal  closeModal={toggleHandleModal} />
 </Modal>
 }
 
    </div>
  )
}
