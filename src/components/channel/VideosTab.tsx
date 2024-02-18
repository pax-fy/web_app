//@ts-nocheck
import React from 'react'
import { VideoCard } from '../cards'
import NoData from '../common/NoData'

  type videoTabProps = {
     video? : any
      loading?: any
      error ? : any
  }
export default function VideosTab( {video, loading, error} : videoTabProps) {
     
  return (
    <div className='flex gap-4 flex-wrap md:px-1'>
        {/*} {video?.notes?.map((note, i) => (
            <VideoCard 
            key={i} 
            video={note} 
            title={note?.metadata?.content?.title}
             cover={note?.metadata?.content?.attachments[0]?.name}
             channel={note?.character}
             channelId={note?.characterId}
             noteId={note.noteId}
             createdAt={note?.createdAt}
            
            />
        ))}*/}

        <NoData  title='COMING SOON..' isFullPage={false}   />
    </div>
  )
}
