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
import { CharacterAvatar } from "@crossbell/ui";
import {
  useCharacterFollowRelation,
  useCharacterFollowStats,
} from "@crossbell/indexer";
import {  useAccountCharacter, useFollowCharacter, useUnfollowCharacter } from "@crossbell/connect-kit";
import { useRouter } from 'next/router';

 import { useNoteStatus } from "@crossbell/indexer";
/*type Props = {
  video: MirrorablePublication
}*/

const BottomOverlay = ({ video }: any) => {
  const { data: profileStats } = useCharacterFollowStats(video?.characterId);
  const currentCharacter = useAccountCharacter()
  const router = useRouter();
  const follow = useFollowCharacter();
  const { data: relationStatus } = useCharacterFollowRelation(
    currentCharacter?.characterId,
    video?.characterId
  );
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
             <CharacterAvatar   character={video?.character}  className='w-7 h-7' size={``}  />
            <div className='flex min-w-0 flex-col items-start text-white'>
              <h6 className='flex max-w-full items-center space-x-1'>
                {video?.character?.handle}
              </h6>
              <span className='inline-flex items-center space-x-1 text-xs'>
              {profileStats?.followersCount} followers
              </span>
            </div>
          </Link>
        </div>
          <Button
           className='text-white'
           
         variant={`primaryOutline`}
         disabled={relationStatus?.isFollowed}
         onClick={() => follow.mutate(video?.characterId)}
          >
            {relationStatus?.isFollowed ? "Following" : "Follow"}

          </Button>
     
      </div>
    </div>
  )
}

export default BottomOverlay
