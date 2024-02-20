//@ts-nocheck

import React, {useState} from 'react'
import { useGetVideoComments } from '@/hooks';
import CommentCard from '../cards/CommentCard';
import Image from 'next/image';
import { toast } from '../ui/use-toast';
import { ClipLoader } from 'react-spinners';
import { WEBSITE_URL } from '@/assets/constant';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
type commentsProps = {
  comments ? : any 
  profileId ? : any
  videoId ? : any
  loading ? : any
}
export default function Comments({comments, videoId, profileId}: commentsProps) {
  console.log("video comments", comments);
    const [commentTxt, setcommentTxt] = useState("");
    const [isLoading, setisLoading] = useState(false)
  
   const note = {
     characterId : profileId,
     noteId : videoId
   }


     const handleComment = async () => {
      setisLoading(true)
     
      
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

<TooltipProvider>
           <Tooltip>
            <TooltipTrigger>
            <button className='bg-black text-white dark:bg-white dark:text-black py-1.5 px-4 rounded-xl '
   	onClick={
      handleComment
    }
 >Send</button>
            </TooltipTrigger>
            <TooltipContent>
              <div className='flex items-center gap-2'>
                <p className='text-2xl'>💡</p>
                 <p className='text-sm font-semibold'>Still in developement   Stay tuned!</p>
              </div>
            </TooltipContent>
           </Tooltip>
        </TooltipProvider>




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
