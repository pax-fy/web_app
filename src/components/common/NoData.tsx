import React from 'react'
import { TbPacman } from "react-icons/tb";

 type props = {
    title? : string
    details? :  string
    isFullPage ? : boolean
 }
export default function NoData({title, details, isFullPage = true} : props) {
  return (
    <div className={`w-full ${isFullPage && "h-screen"}  flex items-center justify-center `}>
        <div className='flex flex-col items-center justify-center gap-2'>
        <TbPacman className={`${isFullPage ? "text-7xl" : "text-5xl"} `} />
         <h1 className={`${isFullPage ? "text-2xl" : "text-xl"}  font-bold text-text`}>{title || "No Video Yet"}</h1>
         <h2> {details} </h2>
        </div>
        
    </div>
  )
}
