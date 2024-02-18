//@ts-nocheck

import React, {useState} from 'react'
import { useIsConnected, usePostNoteForNote , ConnectButton, useAccountCharacter, useConnectedAccount} from '@crossbell/connect-kit'
import { CharacterAvatar } from "@crossbell/ui";
import { useGetVideoComments } from '@/hooks';
import CommentCard from '../cards/CommentCard';
import Image from 'next/image';
import { toast } from '../ui/use-toast';
import { ClipLoader } from 'react-spinners';
type commentsProps = {
  comments ? : any 
  profileId ? : any
  videoId ? : any
  loading ? : any
}
export default function Comments({comments, videoId, profileId}: commentsProps) {
  console.log("video comments", comments);
    const character = useAccountCharacter();
    const isConnected = useIsConnected();
    const [commentTxt, setcommentTxt] = useState("");
    const account = useConnectedAccount();
    const postNoteForNote = usePostNoteForNote();
    const [isLoading, setisLoading] = useState(false)
  
   const note = {
     characterId : profileId,
     noteId : videoId
   }


     const handleComment = async () => {
      setisLoading(true)
      try{
       
        postNoteForNote.mutate({
          note,
          metadata: {
            content: commentTxt,
            sources: ["xtube_v1"],
            external_urls: ["zenvid.xyz"],
            tags: ["comment"],
          },
        });
        setisLoading(false)
      }catch (error){
        setisLoading(false)
        toast({
          title : "Something went wrong",
           description : error
        })
      }
     }
   if(comments?.data?.list < 1){
    return(
      <div className=' flex flex-col items-center justify-center'> 
        <div className='my-2 flex flex-col items-end justify-end gap-3 w-full'>
        <textarea  
        value={commentTxt}
        onChange={e => setcommentTxt(e.target.value)}
   placeholder='Say something about this...'
  className='w-full h-16 no resize-none focus:outline-none border p-2 rounded-xl border-gray-400 dark:border-gray-600 bg-inherit'

/>
 <button className='bg-black text-white dark:bg-white dark:text-black py-1.5 px-4 rounded-xl '
   	onClick={
      handleComment
    }
 >Send</button>
      </div>
      <div className='flex items-center justify-center flex-col gap-3 mb-2'>
        <Image
      src={`/img/no-comment.svg`}
      width={400}
      height={400}
      alt='no comment'
      className='w-28 h-28'
        />
        <h1 className='text-sm'>No comment Be the First one to comment</h1>
        </div>
        </div>
    )
   }
  return (
    <div>
      <h1>Comments</h1>

      <div className='my-2 flex flex-col items-end justify-end gap-3'>
        <textarea  
         value={commentTxt}
         onChange={e => setcommentTxt(e.target.value)}
   placeholder='Say something about this...'
  className='w-full h-14 no resize-none focus:outline-none border p-1 rounded-xl border-gray-400 dark:border-gray-600'

/>
 <button className='bg-black text-white dark:bg-white dark:text-black py-1.5 px-4 rounded-xl '
   	onClick={handleComment}>{isLoading ? (<div className='flex gap-2 items-center'><ClipLoader loading={isLoading} size={14} color='red'  /> <p className='text-sm'>Sending</p> </div>) : <p>Send</p>}</button>
      </div>

      <div>
         {comments?.data?.list?.map((item, i) => (
          <CommentCard  key={i} comment={item?.metadata?.content} creator={item?.character}  commentId={item?.noteId} createdAt={item?.createdAt}   />
         ))}
      </div>
    </div>
  )
}
