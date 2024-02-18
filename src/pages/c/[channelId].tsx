import ChannelPage from '@/components/channel/ChannelPage'
import { GET_CHANNEL_INF0_BY_ID } from '@/graphql/fragments/getChannelInfo'
import React from 'react'
import { apolloClient } from '@/graphql/apolloClient'
import { NextSeo } from 'next-seo'
import { IPFS_GATEWAY2 } from '@/assets/constant'
export default function channel({data}: any) {

   console.log("the data from profile", data)
 
  return (
<>
<NextSeo
  title={data?.character?.metadata?.content?.name}
  description={data?.character?.metadata?.content?.bio}
   openGraph={{
    images : [
      {
        url : `/img/website-banner.png`,
        width: 800,
            height: 600,
            alt: 'Og Image Alt',
      }
    ]
   }}
/>
<ChannelPage  data = {data} />
</>
 

  )
}

export async function getServerSideProps({ params }: any) {
  const { channelId } = params;

  const ChannelId_persed = parseInt(channelId, 10);
// Fetch the post data using  apollo client

  const {data, loading, error, errors} = await apolloClient.query({
      query : GET_CHANNEL_INF0_BY_ID,
      variables : {
        "where": {
          "characterId": ChannelId_persed
        }
      }
      })

      return {
          props : {
              data : data,
              profId : channelId,
              loading : loading,
             // error : error

          }
      }
}

