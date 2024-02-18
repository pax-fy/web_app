import type { RefObject } from 'react'

type Props = {
  heading?: string
  subheading?: string
  sectionRef: RefObject<HTMLDivElement>
}
export default function HorizontalControls({
  heading,
  subheading,
  sectionRef,
}: Props) {
  const sectionOffsetWidth = sectionRef.current?.offsetWidth ?? 1000
  const scrollOffset = sectionOffsetWidth / 1.2

  const scroll = (offset: number) => {
    if (sectionRef.current) {
      sectionRef.current.scrollLeft += offset
    }
  }
  return (
    <div className='flex items-center justify-between w-full lg:max-w-[99%] mx-auto'>
      <div className='flex items-center space-x-3 text-xl'>
        {/*<h1 className='text-brand-500 font-bold'>{heading}</h1>*/}
        <p>{subheading}</p>
      </div>
      <div className='space-x-2'>
        <button
          onClick={() => scroll(-scrollOffset)}
          className='hover:bg-gallery dark:hover:bg-smoke rounded-full p-2 backdrop-blur-xl focus:outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5 8.25 12l7.5-7.5'
            />
          </svg>
          <span className='sr-only'>Scroll Left</span>
        </button>
        <button
          onClick={() => scroll(scrollOffset)}
          className='hover:bg-gallery dark:hover:bg-smoke rounded-full p-2 backdrop-blur-xl focus:outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m8.25 4.5 7.5 7.5-7.5 7.5'
            />
          </svg>

          <span className='sr-only'>Scroll Right</span>
        </button>
      </div>
    </div>
  )
}
