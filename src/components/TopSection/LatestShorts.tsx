//@ts-nocheck

import { IPFS_GATEWAY2, IPFS_GATEWAY, shortTest, SHORT_APP_ID } from '@/assets/constant'
import { useDiscoverShorts } from '@/hooks'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUserContext } from '@/providers/UserContext'
import { useGetAllVideos } from '@/hooks/useGetAllVideos'
//@ts-ignore
import ShortsSkeleton from '../skeletons/ShortSkeleton'
import NoData from '../common/NoData'
export default function LatestShorts() {
  const {data, loading, error} = useDiscoverShorts()

  const [allFilterePosts, setallFilterePosts] = useState([])
  const [allPostswMetadata, setallPostswMetadata] = useState({})
     const {allVids, allVidsLoading, allVidsError} = useGetAllVideos()
    const {primaryProfile, isShowHandleModal, toggleHandleModal} = useUserContext()
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
      post.metadata.source === SHORT_APP_ID && post.metadata.cover !== "DEMO CONTENT"
    );
  
    setallFilterePosts(filteredPosts)
  
      console.log("all filtered  SHORT   posts", filteredPosts)
       console.log("the SHORT posts with metadta", postsWithMetadata)
         }
  
         //console.log("filitooooo", getMetadata())
  
         useEffect(() => {
     
            getMetadata();
         
          
        }, [allVids]);
  
        useEffect(() => {
        if(! primaryProfile){
         toggleHandleModal()
        }
        }, [])
        
       







   console.log("short videos", allFilterePosts)

   if(loading){
    return <ShortsSkeleton  />
   }

   if(allFilterePosts?.length  < 0){
    return(
      <NoData title='No Short Videos Yet' isFullPage={false}  />
    )
   }

    // lLink to specific short 

   //  /${item?.characterId }-${item.noteId}
  return (
    <div className='flex gap-x-4   '>
      {/*@ts-ignore */}
       {allFilterePosts?.map((item , i) => (
       <Link href={`/shorts/${item?.profile?.id }-${item.id}`} key={i}>
       <div className='h-[350px] w-[200px] rounded-lg bg-black md:w-[210px]  lg:w-[230px]'>
         <Image
           src={`${IPFS_GATEWAY}${item?.metadata?.cover}`}
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
