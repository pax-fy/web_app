
//@ts-nocheck
import { APP_NAME, APP_DESCRIPTION,
   APP_ID, INFINITE_SCROLL_ROOT_MARGIN,
    SHORT_APP_ID,   } from '@/assets/constant'
import { shortTest } from '@/assets/constant'
import { DISCOVER_VIDEOS } from '@/graphql/fragments/discoverVideos'
import { useInView } from 'react-cool-inview'
import { GET_FULL_VIDEO } from '@/graphql/fragments/getFullVideo'
import { GET_ALL_VIDEOS } from '@/graphql/fragments/getVideos'
import { useKeenSlider } from 'keen-slider/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ShortVideo from './ShortVideo'
import { KeyboardControls, WheelControls } from './SliderPlugin'
import MetaTags from '../common/MetaTags'
import { useLazyQuery } from '@apollo/client'
import { GET_VIDEO_BY_ID } from '@/graphql/fragments/getVideoById'
import NoData from '../common/NoData'



const request = {  
  "where": {
    "metadata": {
      "content": {
        "path": [
          "sources"
        ],
        "array_contains": [SHORT_APP_ID]
      }
    }
  }
}

const Bytes = () => {
  const router = useRouter()
  const [currentViewingId, setCurrentViewingId] = useState('')
  const [selectedVideoId, setselectedVideoId] = useState()
  const [allFilterePosts, setallFilterePosts] = useState([])
const [allPostswMetadata, setallPostswMetadata] = useState({})
const [singleByteWithMetadata, setsingleByteWithMetadata] = useState()
  const { id } = router.query;


    console.log("the filtered shits", allFilterePosts)
         // Function to fetch metadata for a given CID
         const fetchMetadata = async (cid) => {
          try {
            const response = await fetch(`https://ipfs.subsocial.network/ipfs/${cid}`);
            const data = await response.json();
              console.log("th returned data", data)
            return data;
          } catch (error) {
            console.error('Error fetching metadata for CID:', cid, error);
            return {}; // Return empty object in case of error
          }
        };
             const getMetadata = async (allVids : any) => {
      
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
      
          console.log("all filtered  posts", filteredPosts)
           console.log("the posts with metadta", postsWithMetadata)
             }


             //for single  video

             const getSingMetadata = async (allVids : any) => {
      
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
   
          setsingleByteWithMetadata(postsWithMetadata)
        // Filter posts based on the source parameter in metadata
    /* const filteredPosts = postsWithMetadata.filter(post =>
       post.metadata.source === SHORT_APP_ID && post.metadata.cover !== "DEMO CONTENT"
     );
   
     setallFilterePosts(filteredPosts)*/
   
       //console.log("all filtered  posts", filteredPosts)
        console.log("the single posts with metadta", postsWithMetadata)
          }


  //@ts-ignore
 // const  id ? [profileId, postId] = id?.split("-")   ""
 
 const [profileId, postId] = id ? id.split("-") : [null, null];

  console.log("the video id", postId)


   console.log("the short id", id)
  const [sliderRef, { current: slider }] = useKeenSlider(
    {
      vertical: true,
      slides: { perView: 1, spacing: 10 },
    },
    [WheelControls, KeyboardControls]
  )

  /* const [
    fetchPublication,
    { data: singleByteData, loading: singleByteLoading }
  ] = usePublicationLazyQuery()*/

  const [
    fetchPublication,
    { data: singleByteData, loading: singleByteLoading }
  ] = useLazyQuery(GET_FULL_VIDEO) 

   console.log("single publication", singleByteData)

  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useLazyQuery(GET_ALL_VIDEOS,{
      
      onCompleted: ({ explorePublications }) => {
        const items =  data?.psts   //explorePublications?.items
           getMetadata(data)
          console.log("items from all bytes", items)
        const id = router.query.id
        if (!id ) {
          const nextUrl = `${location.origin}/shorts/${items[0]?.characterId}-${items[0].noteId}`
          //history.pushState({ path: nextUrl }, '', nextUrl)
          router.push(nextUrl)
        }
      }
    })

    console.log("all bytes videos", data)

      console.log("the slider button", slider?.prev)
      console.log("the slider next button", slider?.prev)

   const bytes = data?.posts 
  //const pageInfo = data?.explorePublications?.pageInfo
  const singleByte = singleByteData?.posts[0]
console.log("the single byte", singleByte)
   const fetchSingleByte = async () => {
    const publicationId = router.query.id
    const { id } = router.query;

    if (!id) {
      // Handle the case where id is not available
      fetchAllBytes();
      return;
    }
    //@ts-ignore
    const [profileId, postId] = id?.split("-") 
    const ProfileId_persed = parseInt(profileId, 10);
    const PostId_parsed = parseInt(postId, 10);


    if (!id) {
     
      fetchAllBytes()
    }
    await fetchPublication({
      variables: {
        //request: { forId: publicationId }
        "where": {
          "id": postId,
          "profile": profileId
        }
      },
      onCompleted: ()  => {
        fetchAllBytes(),
        getSingMetadata(singleByte)

      },
      fetchPolicy: 'network-only'
    })
  }
  
  useEffect(() => {
    const { id } = router.query;
    if (router.isReady) {
      fetchSingleByte()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, singleByte, postId, id])

   const { observe } = useInView({
    threshold: 0.25,
    rootMargin: INFINITE_SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
           // cursor: pageInfo?.next
          }
        }
      })
    }
  })

  if (loading || singleByteLoading) {
    return (
      <div className="grid h-[80vh] place-items-center">
       {/*} <Loader />*/}
       <p>LODAING ... </p>
      </div>
    )
  }

  if (error || (!bytes?.length && !singleByte)) {
    return (
      <div className="grid h-[80vh] place-items-center">
        {/*<NoDataFound isCenter withImage />*/}
        <NoData  title='No Short Videos Yet' isFullPage={true}  />
      </div>
    )
  }

  return (
    <div className='relative h-[calc(100vh-7rem)] overflow-y-hidden focus-visible:outline-none md:h-[calc(100vh-4rem)]'>
      <MetaTags title="Shorts" />
      <div
        ref={sliderRef}
        className='keen-slider h-[calc(100vh-7rem)] snap-y snap-mandatory focus-visible:outline-none md:h-[calc(100vh-4rem)]'
      >
        {singleByte && (
          <ShortVideo
            video={singleByte}
            currentViewingId={currentViewingId}
            intersectionCallback={(id) => setCurrentViewingId(id)}
          />
        )}

     {/*} .filter(video => video?.noteId !==  postId)*/}
        {/* @ts-ignore */}
        {  allFilterePosts?.filter(video => video?.id !==  postId).map((video, index) => (
          <ShortVideo
            video={video}
            currentViewingId={currentViewingId}
            intersectionCallback={(id) => setCurrentViewingId(id)}
            key={`${video?.id}_${index}`}
          />
        ))}
      </div>
      {/*pageInfo?.next && (
        <span ref={observe} className="flex justify-center p-10">
          <Loader />
        </span>
      )*/}
      <div className='laptop:right-6 ultrawide:right-8 bottom-2 right-4 hidden flex-col space-y-2 md:absolute md:flex'>
        <button
          className='bg-gallery rounded-full p-3 focus:outline-none dark:bg-gray-800 bg-teal-100'
          onClick={() => slider?.prev()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m4.5 15.75 7.5-7.5 7.5 7.5'
            />
          </svg>
        </button>
        <button
          className='bg-gallery rounded-full p-3 focus:outline-none dark:bg-gray-800 bg-teal-100'
          onClick={() => slider?.next()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Bytes
