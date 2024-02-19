//import Badge from '@components/Common/Badge'
//import FollowActions from '@components/Common/FollowActions'
/*import {
  formatNumber,
  getProfile,
  getProfilePicture,
  getPublicationData
} from '@tape.xyz/generic'
import type { MirrorablePublication } from '@tape.xyz/lens'*/
import Link from 'next/link'
import Button from '../common/Button'

import { useRouter } from 'next/router';


/*type Props = {
  video: MirrorablePublication
}*/

const BottomOverlay = ({ video }: any) => {
  const router = useRouter();
  
  // const profile = video.by
console.log("video from overlay", video)
  return (
    <div className='rounded-b-large absolute bottom-0 left-0 right-0 z-[1] bg-gradient-to-b from-transparent to-black px-3 pb-3 pt-5'>
      <h1 className='line-clamp-2 break-all pb-2 font-bold text-white'>
        {video?.metadata?.content?.title}
      </h1>
      <div className='flex items-center justify-between'>
        <div className='min-w-0'>
          <Link
            href={`/u/${`/profile`}`}
            className='flex flex-none cursor-pointer items-center space-x-2'
          >
           <div className='w-7 h-7 rounded-full border border-purple-400'>
             
           </div>
            <div className='flex min-w-0 flex-col items-start text-white'>
              <h6 className='flex max-w-full items-center space-x-1'>
                {video?.character?.handle}
              </h6>
              <span className='inline-flex items-center space-x-1 text-xs'>
              100 followers
              </span>
            </div>
          </Link>
        </div>
          <Button
           className='text-white'
           
         variant={`primary`}
         disabled={true}
         
          >
           Follow

          </Button>
     
      </div>
    </div>
  )
}

export default BottomOverlay
