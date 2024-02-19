//@ts-nocheck
import React, {useState, useEffect} from 'react'
import ChannelBanner from './ChannelBanner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetCreatorContents } from '@/hooks/useGetCreatorContents';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_CREATOR_CONTENTS } from '@/graphql/getCreatorContents';
import { apolloClient } from '@/graphql/apolloClient';

import VideosTab from './VideosTab';
import BadgesTab from './BadgesTab';
export default function ChannelPage({data} : any) {
  const router = useRouter();
  const { channelId } = router.query;
  const [userContents, setuserContents] = useState()

  // const {data: contents, loading, error} = useGetCreatorContents(153)
  const Profile_Int = parseInt(channelId, 10);
  const {data: contents, loading, error, refetch} = useQuery(GET_CREATOR_CONTENTS, {
   
    variables : {
        "where": {
            "characterId": {
              "equals": Profile_Int
            },
            "AND": [
              {
                "metadata": {
                  "content": {
                    "path": [
                       "sources"
                    ],
                     "array_contains": ["xTube_v1"]
                  }
                }
              }
            ]
          }
    }
})

console.log("channel contents", contents)



   
  return (
    <div className='min-h-screen'>
        <ChannelBanner 
        //  avatar={data?.character?.metadata?.content?.avatars[0]}
          channelId={data?.character?.characterId}
          handle={data?.character?.metadata?.content?.name}
          followers={10}
          channel={data?.character}
            relations={"false"}
        />
        <div>
        <Tabs defaultValue="content" className="  mt-10 py-2 pl-3 ">
  <TabsList>
    <TabsTrigger value="content">Content</TabsTrigger>
    <TabsTrigger value="badges">Badges</TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger>
  </TabsList>
  <TabsContent value="content">
   <VideosTab 
     video={contents}
     loading={loading}
     error={error}
   />
 
    </TabsContent>
  <TabsContent value="badges">
  <BadgesTab  />
    </TabsContent>
    <TabsContent value="about">
     <div>
        <h1>{data?.character?.metadata?.content?.bio}</h1>
     </div>
    </TabsContent>
</Tabs>

        </div>
    </div>
  )
}
