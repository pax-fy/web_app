//@ts-nocheck
import React, {useState, useEffect} from 'react'
import { IPFS_GATEWAY2 } from '@/assets/constant'
import moment from 'moment'
import RelatedVideoCrad from '../cards/RelatedVideoCrad';
import { useDiscoverVideos } from '@/hooks/useDiscoverVideos';
import RelatedVideoLosderSkelton from '../skeletons/RelatedVideoCardSpinner';
import NoData from '../common/NoData';
import { useUserContext } from '@/providers/UserContext'
import { useGetAllVideos } from '@/hooks/useGetAllVideos'
import { APP_ID } from '@/assets/constant';
export default function RelatedVideos() {
  const [isLoading, setisLoading] = useState(true)
    const {data, loading, error} = useDiscoverVideos()
    const [allFilterePosts, setallFilterePosts] = useState([])
    const [allPostswMetadata, setallPostswMetadata] = useState({})
    const {allVids, allVidsLoading, allVidsError} = useGetAllVideos()

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
       {allFilterePosts?.map((video, i) => (
            <RelatedVideoCrad
            key={i} 
            video={video} 
            title={video?.metadata?.title}
             cover={video?.metadata?.cover}
             channel={video?.profile}
             channelId={video?.profile?.id}
             noteId={video?.id}
             createdAt={`whait`}
            />
       ))}
    </div>
  )
}
