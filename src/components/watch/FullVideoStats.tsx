
import React, {useState, useEffect} from 'react'
import ShareButtons from '../cards/Share';
import Modal from '../common/Modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import moment from 'moment';
import { WEBSITE_URL } from '@/assets/constant';
  type statsProps ={
    stats? : any
    createdAt ? : any
     videId? : any
     mints ? : any
     likes ? : any
     tips ? : any
     isLiked ? : any
     note ? : any
  }
export default function FullVideoStats({stats, createdAt, videId, tips, likes, isLiked, note} : statsProps) {
  const currentDate = new Date();
  const videoCreatedAt = new Date(createdAt);
  //@ts-ignore
  const diffInMilliseconds = currentDate - videoCreatedAt;
  const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
  const duration = moment.duration(diffInHours, "hours");

   const [testTruth, settestTruth] = useState(true)

    const [isShowTipModal, setisShowTipModal] = useState(false)
  return (
    <div className={`flex flex-col md:flex-row justify-start md:justify-between md:items-center px-2 border-b border-b-gray-400/60  dark:border-gray-800 pb-2 my-3 `}>
      <div className='flex items-center gap-4'>

         <div className='flex items-center gap-2 text-sm dark:text-gray-400 text-gray-800'>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<p className='xs:text-xs'>{duration.humanize().replace("a", "")} ago</p>
         </div>
         <div className={`flex gap-2 items-center text-sm dark:text-gray-400 text-gray-800`}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
   <p className='text-xs'>{stats?.viewCount || "0"} views</p>
         </div>
         </div>

         <div className='flex gap-6 items-center md:justify-center text-text-muted mt-4 md:my-0'>
          <>
            {isLiked? (
              <div className='flex items-center gap-2 text-text-primary cursor-pointer'>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
</svg>
  <p className=' text-sm md:font-semibold'>{likes || "0"}</p>
              </div>
            ) : (
              <div className='flex items-center gap-2 hover:text-text-primary cursor-pointer' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
</svg>

<p className=' text-sm md:font-semibold'>{likes || "0"}</p>
          </div>
            )
             }
          </>

          <div className='flex items-center gap-2 hover:text-text-primary cursor-pointer' onClick={() => setisShowTipModal(!isShowTipModal)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


<p className='text-sm md:font-semibold'>Support</p>
          </div>
   <>
    {
      testTruth ? (
        <div className=' items-center gap-2 text-text-primary cursor-pointer  flex'>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
  <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
  <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
</svg>
<p className='text-sm font-semibold'>Minted 2</p>
        </div>
      ): (
        <div className=' items-center gap-2 hover:text-text-primary cursor-pointer  flex' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
<path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
</svg>

<p className='text-sm font-semibold'>Mint 5</p>
        </div>
      )
    }
   </>
           <Dialog>
  <DialogTrigger>
  <div className='items-center gap-2 hover:text-text-primary cursor-pointer flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>


<p className='text-sm font-semibold'>Share</p>
          </div>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='mb-4 '>Share</DialogTitle>
      <DialogDescription>
       <ShareButtons url={`${WEBSITE_URL}/watch/${note?.characterId}-${videId}`} />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  <Modal isOpen={isShowTipModal} closeModal={() => setisShowTipModal(!isShowTipModal)}
    title="Support Your Fav creator"
  >
        <div>Tip modal contents</div>
  </Modal>
         </div>

    </div>
  )
}
