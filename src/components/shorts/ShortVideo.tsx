import MetaTags from '../common/MetaTags'

import VideoPlayer from '../VideoPlayer'
import type { FC } from 'react'
import React, { useEffect, useRef } from 'react'
import BottomOverlay from './BottomOverly'
import TopOverlay from './TopOverly'
import ByteActions from './ByteActions'
import { IPFS_GATEWAY } from '@/assets/constant'
type Props = {
  video: any
  currentViewingId: string
  intersectionCallback: (id: string) => void
}

const ByteVideo: FC<Props> = ({
  video,
  currentViewingId,
  intersectionCallback
}) => {
  const videoRef = useRef<HTMLMediaElement>()
  const intersectionRef = useRef<HTMLDivElement>(null)
  //const targetPublication = getPublication(video)

  const thumbnailUrl = `${IPFS_GATEWAY}${video?.metadata?.content?.attachments[0].name}`
  const playbackId = `${video?.metadata?.content?.attachments[0].address}`
  const videoId = `${video?.characterId}-${video?.noteId}`
  const activeProfile = "0x004455663xacuuu"
  
  const playVideo = () => {
    if (!videoRef.current) {
      return
    }
    videoRef.current.currentTime = 0
    videoRef.current.volume = 1
    videoRef.current.autoplay = true
    videoRef.current?.play().catch(() => {})
  }

  const observer = new IntersectionObserver((data) => {
    if (data[0].target.id && data[0].isIntersecting) {
      intersectionCallback(data[0].target.id)
      const nextUrl = `${location.origin}/shorts/${videoId}`
      history.replaceState({ path: nextUrl }, '', nextUrl)
    }
  })

  useEffect(() => {
    if (intersectionRef.current) {
      observer.observe(intersectionRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pauseVideo = () => {
    if (!videoRef.current) {
      return
    }
    videoRef.current.volume = 0
    videoRef.current?.pause()
    videoRef.current.autoplay = false
  }

  const onClickVideo = () => {
    if (videoRef.current?.paused) {
      playVideo()
    } else {
      pauseVideo()
    }
  }

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return
    }
    videoRef.current = ref
    playVideo()
  }

  if (!video) {
    return null
  }

  //keen-slider__slide flex snap-center justify-center focus-visible:outline-none md:ml-16 md:pb-2
  return (
    <div className="keen-slider__slide flex snap-center  justify-center focus-visible:outline-none md:ml-16 md:pb-2">
      <MetaTags title={video?.metadata?.content?.title} />
      <div className="relative">
        <div className="rounded-large 2xl:w-[650px] flex h-full w-full min-w-[270px] items-center overflow-hidden bg-black  md:w-[300px]">
          <div
            className="absolute top-[50%]"
            ref={intersectionRef}
            id={videoId}
          />
          <VideoPlayer
            address={activeProfile}
            refCallback={refCallback}
            playbackId={playbackId}
            posterUrl={thumbnailUrl}
            ratio="9to16"
            showControls={false}
            options={{
              autoPlay: currentViewingId === videoId,
              muted: currentViewingId !== videoId,
              loop: true,
              loadingSpinner: true,
              isCurrentlyShown: currentViewingId === videoId,
              maxHeight : true
            }}
           // shouldUpload={getShouldUploadVideo(targetPublication)}
          />
        </div>
        <TopOverlay onClickVideo={onClickVideo} />
        <BottomOverlay video={video} />
        <div className='sm:hidden px-2 '>
          <h1>hello  world</h1>
        <ByteActions video={video?.id} />
        </div>
      </div>
      <div className='hidden sm:flex  items-end '>
      <ByteActions video={video} />
      </div>
    </div>
  )
}

export default React.memo(ByteVideo)