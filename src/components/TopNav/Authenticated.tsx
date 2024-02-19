//@ts-nocheck

import React, {useState} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import ChevronDownOutline from '../common/Icons/ChevronDown';
import ProfileManagerOutline from '../common/Icons/ProfileManager';
import { ShortsOutline, User } from '../common/Icons';
import { truncateText } from '@/helpers';
import  {useTheme} from 'next-themes'
import Link from 'next/link';
import Button from '../common/Button';
import { MdOutlineVideoCall } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { installApp, isInstallAvailable} from '@/lib/install'
import SearchVids from './Search';
import Modal from '../common/Modal';
import CreateHandleModal from '../common/CreateHandleModal';
interface authentictedProps {
    address : string 
     handle : string
     profile? : any
     disconnect : any
}
export default function Authenticated({address, handle, profile, disconnect}: authentictedProps) {
   const  {theme, setTheme} = useTheme()
const [isShowHandleModal, setisShowHandleModal] = useState(false)

        
  const  handleToggleTheme = () => {
    if(theme === "dark") {
      setTheme("light")
    }else {
      setTheme("dark")
    }
  }
  return (
    <div className='flex gap-3 items-center '>
      
     {/*} <div className='flex items-center gap-4'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer xs:hidden md:block" onClick={show}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
</svg>

 <Link href={`/upload`}>
 <div className='flex gap-2 bg-black text-white dark:bg-white dark:text-black items-center py-1.5 rounded-xl cursor-pointer px-3 xs:hidden md:flex'>
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
<p>Upload</p>
 </div>
  </Link>
  </div> */}

   

    
  <Button
      variant={`transparent`}
      size={`circle`}
      className=' text-text-muted dark:text-text hidden md:block '
      href='/upload'
     >
     <MdOutlineVideoCall  className='w-6 h-6' />
     </Button>

 

   <Popover>
      <PopoverTrigger>
           <div className='flex items-center gap-2   rounded-lg'>
           <div className='w-7 h-7 bg-purple-400 border border-red-400 flex items-center justify-center font-extrabold rounded-full text-white'>
              P
           </div>
            <div className='xs:hidden md:block'>
                 <h1 className=' capitalize text-sm leading-none font-semibold hidden md:block'>{profile?.handle}</h1>
                 {/*<h2 className='text-xs text-text-muted dark:text-text'>@{handle}</h2>*/}
            </div>
          
           <ChevronDownOutline className='w-3.5 h-3.5 xs:hidden md:block'   />
           </div>
      </PopoverTrigger>
       <PopoverContent className=''>
        <div>
        
            <div className='flex gap-2 items-center cursor-pointer my-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

<p className='font-semibold text-sm '>My channel</p>
            </div>
            
            <div className='flex gap-2 items-center cursor-pointer my-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
</svg>
<p className='font-semibold text-sm'>{address && truncateText(address, 10)}</p>
            </div>
           {/* <div className='flex gap-2 items-center cursor-pointer my-3' onClick={handleShowOpModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
<p className='font-semibold text-sm '>Operator Sign</p>
</div>*/}
  {/*}
<div className='flex gap-2 items-center cursor-pointer my-3'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<p className='font-semibold text-sm'>{balance?.formatted} {balance?.symbol}</p>
</div>
*/}
{/*}
<div className='flex gap-2 items-center cursor-pointer my-3' onClick={showCharacterModal}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>

<p className='font-semibold text-sm'>Switch Channel</p>
</div>
*/}
<div className='flex gap-2 items-center cursor-pointer my-3' onClick={handleToggleTheme}>
<div>
    {theme === "dark"  ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
      
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
</svg>

    )}
</div>

<p className='font-semibold text-sm'>{theme === "dark" ? "Switch to Light" : "Switch to Dark"}</p>
</div>

{isInstallAvailable() && <div className='flex gap-2 items-center cursor-pointer mt-4' onClick={() => installApp()}> 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

<p  className='font-semibold text-sm'>Install App</p>
  
    </div>}
<div className='flex gap-2 items-center cursor-pointer mt-6' onClick={() => disconnect()}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>

 <p>Sign out</p>
</div>

<div className='flex gap-2 items-center cursor-pointer mt-6' onClick={() => setisShowHandleModal(!isShowHandleModal)}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
 <p>Claim handle</p>
</div>
        </div>
       </PopoverContent>
   </Popover>
   <Modal isOpen={isShowHandleModal} closeModal={() => setisShowHandleModal(!isShowHandleModal)}>
     <CreateHandleModal closeModal={() => setisShowHandleModal(false)}  />
   </Modal>
   </div>
  )
}
