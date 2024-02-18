import Button from '../common/Button'
import Input from '../common/inputs/Input'
import { cx } from '@/lib/classNames'
import { useRef, useState, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { BsXCircleFill } from 'react-icons/bs'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useLazyQuery } from '@apollo/client'
import { DISCOVER_VIDEOS } from '@/graphql/fragments/discoverVideos'
import { APP_ID, SHORT_APP_ID } from '@/assets/constant'
type SearchVProps = {
  isSearchOpen?: boolean
  setIsSearchOpen?: () => void
}
export default function SearchVids({ setIsSearchOpen }: SearchVProps) {
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [search, setSearch] = useState('')

    
  const [fetchMatchedVideos, { data, loading, error, fetchMore }] =
  useLazyQuery(DISCOVER_VIDEOS,{
    variables: {
      "where": {
        "metadata": {
          "content": {
            "path": [
              "sources"
            ],
            "array_contains": [APP_ID, SHORT_APP_ID]
          }
        }
      }
    },
  
    
  })

  console.log("the matched contents from search", data)

  useEffect(() => {
  if(search.length > 3){
     fetchMatchedVideos()
  }
  }, [search])
  

  const searchButton = (
    <Button
      size='circle'
      variant='transparent'
      className={`text-text-muted dark:text-text ${
        isOpenSearch && 'hidden'
      } absolute right-0`}
      onClick={() => {
        setIsOpenSearch(true)
        searchRef.current?.focus()
      }}
    >
      <HiMagnifyingGlass className='text-xl' />
    </Button>
  )

  const clearOrCloseSearch = () => {
    //removeFocusedElement()
    setIsOpenSearch(false)
    if (search) {
      setSearch('')
      searchRef.current?.focus()
    } else {
      setIsOpenSearch(false)
      searchRef.current?.blur()
    }
  }
  useHotkeys('esc', clearOrCloseSearch, {
    keydown: true,
    enableOnFormTags: ['INPUT'],
  })
  const openSearch = () => {
    setIsOpenSearch(true)
    searchRef.current?.focus()
  }
  useHotkeys('/, meta+k, ctrl+k', openSearch, {
    enabled: !isOpenSearch,
    preventDefault: true,
  })
  return (
    <div className='relative flex w-full    items-center  md:max-w-4xl ml-auto '>
      {searchButton}
      <div className='relative flex w-full'>
        <div
          className={cx(
            'absolute left-0 top-1/2 z-10 w-full -translate-y-1/2 transition-opacity',
            !isOpenSearch && 'pointer-events-none opacity-0'
          )}
        >
          <Input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftElement={(className) => (
              <HiMagnifyingGlass
                className={cx(className, 'z-10 ml-1 text-xl text-text-muted')}
              />
            )}
            rightElement={(className) => (
              <Button
                variant='transparent'
                size='noPadding'
                className={cx(
                  className,
                  'z-10 mr-1 cursor-pointer text-xl text-text-muted'
                )}
                onClick={clearOrCloseSearch}
              >
                <BsXCircleFill />
              </Button>
            )}
            size='sm'
            pill
            placeholder='Search rooms'
            variant='fill-bg'
            className='pl-10'
          />
        </div>
      </div>
    {search.length > 3 && isOpenSearch  &&
       <div className='w-full bg-background dark:bg-background-light border border-sky-200 min-h-[200px] absolute top-6 py-2 px-3 rounded-lg'>hello  world  </div>
    }
    </div>
  )
}
