import {
    HeartOutline,
    HomeOutline,
    ShortsOutline,
  } from '@/components/common/Icons'
  import Link from 'next/link'
  import { useState } from 'react'
  import { CiCirclePlus, CiVideoOn } from 'react-icons/ci'
  import { IoIosCloseCircleOutline } from 'react-icons/io'
  import { MdOutlineVideoLibrary } from 'react-icons/md'
  export default function BottomNav() {
    const [isShowCreateModal, setisShowCreateModal] = useState(false)
    return (
      <div className='fixed  bottom-0 left-0 right-0 flex h-12 w-full items-center justify-evenly gap-3 border-t border-border-gray bg-background pt-1 dark:border-border-gray  md:hidden'>
        <Link href={'/'}>
          <div>
            <HomeOutline className='h-5 w-5 text-text-muted' />
          </div>
        </Link>

        <Link href={'/upload'}>
          <div>
          <CiCirclePlus className='h-7 w-7 cursor-pointer text-text-muted' />  
                  </div>
        </Link>
        <Link href={'/shorts'}>
          <div>
            <ShortsOutline className='h-5 w-5 text-text-muted' />
          </div>
        </Link>
    
  
  
        {isShowCreateModal && (
          <div className=' fixed bottom-0 z-10 h-24 w-full items-center rounded-t-xl bg-background-lightest px-1 py-2'>
            <div className='flex flex-col items-center justify-center'>
              <div className='h-0.5 w-14 bg-gray-400'> </div>
            </div>
            <div className='flex items-end justify-end'>
              <IoIosCloseCircleOutline
                className='cursor-pointer text-text-muted'
                onClick={() => setisShowCreateModal(false)}
              />
            </div>
  
            <div className='flex items-center justify-evenly gap-4 '>
              <div className='flex flex-col items-center gap-1'>
                <ShortsOutline className='h-5 w-5 text-text-muted-on-primary' />
                <p className='text-sm'>Short </p>
              </div>
  
              <div className='flex flex-col items-center gap-1'>
                <CiVideoOn className='h-6 w-6 text-text-muted-on-primary' />
                <p className=' text-sm'>Long vid</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  