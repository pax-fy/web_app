import React, {useState} from 'react'
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';
import VideoPage from '@/components/watch/VideoPage';
import { IPFS_GATEWAY2 } from '@/assets/constant';
import Head from 'next/head';
import { GET_VIDEO_BY_ID } from '@/graphql/fragments/getVideoById';
import { NextSeo } from 'next-seo';
import VideoFullSkeleton from '@/components/skeletons/FullVideoSkeleton';
import { GET_FULL_VIDEO } from '@/graphql/fragments/getFullVideo';
import { WEBSITE_URL } from '@/assets/constant';
export default function VideoId({post, loading} : any) {
    const router = useRouter();
    const { videoid } = router.query;
    console.log("the full video", post);
    // Add error checking for router.query
    if (!router || !videoid) {
      return <div>Loading...</div>;
    }

    
    /*===================================
     Splitting  Profile Id and post id
     =======================================
     */

   // const [profileId, postId] = videoid?.split("-");

   //@ts-ignore
   if(loading){
    return(
     < VideoFullSkeleton  />
    )
   }
   
    const activeVideo  = post?.posts[0]

  return (
    <>
   <NextSeo
    title={activeVideo?.title}
    description={activeVideo?.content}
       openGraph={{
        title : activeVideo?.title,
        description: activeVideo?.content ,
        url : `${WEBSITE_URL}/watch/${activeVideo?.profile?.id}-${activeVideo?.id}`,
         images :[
          {
            url : `${IPFS_GATEWAY2}${activeVideo?.cover}`,
            width: 800,
            height: 600,
            alt: `${activeVideo?.content} `,
            type: 'video/mp4',
            
          }
         ],
         siteName : "Paxfy"
       }}
    
   />
 
        <VideoPage 
          videoUri={activeVideo?.source}
          videoCover={activeVideo?.cover}
          videoTitle={activeVideo?.title}
          createdAt={"wait" }
          channelId={activeVideo?.profile?.id}
          vidStats={"none"} 
          channelInfo={activeVideo.profile}
          videoId={activeVideo.id}
          loading={loading}
        />
    </>
  )
}

export async function getServerSideProps({ params }: any) {
    const { videoid } = params;
    const [profileId, postId] = videoid?.split("-");

    if (!videoid) {
        // Handle the case when videoId is not present
        return {
          props: {
            data: null,
            videoId: null,
            loading: false,
            error: "Video ID not provided",
          },
        };
      }
    const ProfileId_persed = parseInt(profileId, 10);
    const PostId_parsed = parseInt(postId, 10);

    // Fetch the post data using  apollo client
  
    const {data, loading, error, errors} = await apolloClient.query({
        query : GET_FULL_VIDEO,
          variables : {
            "where": {
              "id": postId,
              "profile": profileId
            }
          }
      
        })

        return {
            props : {
                post : data,
                videoId : postId,
                loading : loading,
               // error : error

            }
        }
  }
//