import { categories, sidebarNav } from '@/assets/constant'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React, {useState} from 'react'

 type sidebarprops  = {
     isShowFull? : boolean
      toggleSidebar? : any
 }
export default function Sidebar({isShowFull} : sidebarprops) {
  const [active, setactive] = useState(0)
  return (
    <div className={`${! isShowFull && "xs:hidden md:block"}  md:w-14   bg-inherit z-10 text-text `}>
    <div className={`${isShowFull && "w-screen h-screen bg-gray-800/60 fixed top-[60px]"}`}>
        <div className={`${isShowFull ? "w-52 bg-sky-100 dark:bg-background-light p-2 " : "items-center dark:bg-background-light bg-sky-100 w-14"} h-screen fixed top-[60px] flex flex-col  `}>
          {sidebarNav.map((item, i) => (
            <Link key={i} href={item.to}>
            <div className={`${isShowFull ? "flex-row  w-48 items-center py-2 px-4 rounded-xl gap-3" : "flex-col items-center py-1"} flex  my-1 dark:hover:bg-background-lightest px-4 hover:bg-gray-300/80  py-3 `} >  
              <item.icon className={`${isShowFull ? "w-3.5 h-3.5" : "w-5 h-5"}`}  />
              <p className={`text-xs ${! isShowFull && "hidden"}`}>{item.title}</p>
              </div>
              </Link>
             
          ))}
          
  <div className='h-[0.6px] w-full bg-gray-300 dark:bg-gray-600 my-1'> </div>
  {categories.map((item, i) => (
            <Link key={i} href={item.to}>
            <div className={`${isShowFull ? "flex-row  w-48 items-center py-2 px-4 rounded-xl gap-3" : "flex-col items-center"} flex  my-1 dark:hover:bg-gray-700 px-4 hover:bg-gray-300/80  py-3 `} >  
              <item.icon className={`${isShowFull ? "w-3.5 h-4.5" : "w-5 h-5"}`}  />
              <p className={`text-xs ${! isShowFull && "hidden"}`}>{item.title}</p>
              </div>
              </Link>
             
          ))}
        </div>

    </div>
    
    </div>
  )
}
