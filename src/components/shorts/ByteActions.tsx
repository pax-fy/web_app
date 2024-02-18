/*import MirrorPublication from '@components/Common/MirrorPublication'
import PublicationOptions from '@components/Common/Publication/PublicationOptions'
import PublicationReaction from '@components/Common/Publication/PublicationReaction'
import OpenActions from '@components/Watch/OpenActions'
import { Button, Dialog, DialogClose, Flex, IconButton } from '@radix-ui/themes'
import type { MirrorablePublication } from '@tape.xyz/lens'*/

/*type Props = {
  video: MirrorablePublication
}*/
// // w-[calc(100vw-80px)]
import { useState } from "react"
import { useIsConnected, useTipModal, useMintNote,  } from "@crossbell/connect-kit";
import { IoMdShareAlt } from "react-icons/io";
import { useToggleLikeNote, useIsNoteLiked, useNoteLikeCount } from "@crossbell/connect-kit";
import ShareButtons from '../cards/Share';
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { WEBSITE_URL } from "@/assets/constant";
import {
  useCharacterFollowRelation,
  useCharacterFollowStats,
} from "@crossbell/indexer";
import {  useAccountCharacter, useFollowCharacter, useUnfollowCharacter } from "@crossbell/connect-kit";

 import { useNoteStatus } from "@crossbell/indexer";

const ByteActions = ({ video }: any) => {
  const note = {
    noteId : video?.noteId,
    characterId : video?.characterId

  }

  console.log("the note", note)
 
  const isConnected = useIsConnected();
	const { isActive, show, hide } = useTipModal();
  const [{isLiked}] = useIsNoteLiked(note)
  const { data: profileStats } = useCharacterFollowStats(video?.characterId);
  const currentCharacter = useAccountCharacter()
  const router = useRouter();
  const follow = useFollowCharacter();
  const {data : likeCount} = useNoteLikeCount(note)
  const { data: relationStatus } = useCharacterFollowRelation(
    currentCharacter?.characterId,
    video?.characterId
  );
   console.log("the trusted note info", note)
  const { data: status } = useNoteStatus(note);
  console.log("the minted status", status)
	const mintNote = useMintNote();

  const toggleLikeNote = useToggleLikeNote();
   const [testTruth, settestTruth] = useState(true)

  
  return (
    <div className='flex sm:w-16 rounded-sm flex-col items-center justify-between absolute sm:static px-3   bottom-20 sm:bottom-0 sm:right-0 right-0 z-50 space-y-5 dark:bg-gray-700/10   bg-gray-700/10 dark:sm:bg-inherit sm:mb-5  sm:bg-inherit text-text'>
             {isLiked? (
              <div className='flex items-center gap-2 text-rose-500 cursor-pointer'>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
</svg>
  <p className=' text-sm md:font-semibold hidden'>{ "0"}</p>
              </div>
            ) : (
              <div className='flex items-center gap-2 hover:text-rose-500 cursor-pointer' onClick={() => toggleLikeNote.mutate(note)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
</svg>

<p className=' text-sm md:font-semibold hidden'>{"0"}</p>
          </div>
            )
             }

<div className='flex flex-col items-center  hover:text-rose-500 cursor-pointer' onClick={() => show(note)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


<p className='text-sm md:font-semibold hidden'>Support</p>
          </div>

          <>
         
    {
      status?.isMinted  ? (
        <div className=' items-center gap-2 text-rose-500 cursor-pointer  flex'>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
  <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
  <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
</svg>
<p className='text-sm font-semibold '>Minted </p>
        </div>
      ): (
        <div className=' items-center gap-2 hover:text-rose-500 cursor-pointer  flex' onClick={() => mintNote.mutate(note)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
</svg>

<p className='text-sm font-semibold hidden'>Mint </p>
        </div>
      )
    }
   </>

  
   <Dialog>
  <DialogTrigger>
 
  <IoMdShareAlt className="sm:text-2xl cursor-pointer hover:text-rose-500 " />


  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='mb-4 '>Share</DialogTitle>
      <DialogDescription>
       <ShareButtons url={`${WEBSITE_URL}/shorts/${note?.characterId}-${video?.noteId}`} />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default ByteActions
