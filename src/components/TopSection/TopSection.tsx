import { useRef } from 'react'



import HorizontalControls from './HorizontalControls'
import LatestShorts from './LatestShorts'
export default function TopSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const testImage =
    'https://ik.imagekit.io/lenstube/tr:w-404,h-720/https://ik.imagekit.io/lens/media-snapshot/6bbe6f3bd6316047baeec08480f70321111f8ca14358e2b79335903e75cf045d.png'
  return (
    <div className=' hidden    w-full sm:block    py-1  px-1 flex-wrap mb-5'>
      <HorizontalControls
        sectionRef={sectionRef}
        heading=''
        subheading='Shorts'
      />
      <div className='my-1 h-[2px] w-full bg-gray-200 dark:bg-gray-800'></div>
      <div
        ref={sectionRef}
        className='no-scrollbar relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth pt-4 lg:pt-3 pl-2  w-full max-w-[100%]'
      >
        <LatestShorts />
      </div>
    </div>
  )
}
