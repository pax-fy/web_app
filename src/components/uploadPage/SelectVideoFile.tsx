//@ts-nocheck
import { useState, useRef, useEffect } from "react";
import { TvideoSelector } from "@/types";
import { UploadOutline } from "@/Icons";
import { useUserContext } from "@/providers/UserContext";
export default function SelectVideoFile({ handleSelectFile }) {
  const {userAddress, } = useUserContext()
  const videoRef = useRef<HTMLInputElement>(null);

  const handleOpenInput = () => {
    videoRef.current.click();
  };

    if(userAddress){
       <div className="w-full h-screen flex items-center justify-center">
         <h1 className="font-semibold text-xl">Connect Your wallet </h1>
       </div>
    }
  return (
    <div className=" h-[80vh] flex items-center justify-center">
      <div className=" w-full lg:w-[650px] lg:h-[400px] lg:border border-dashed border-gray-400 dark:border-gray-700 rounded-xl flex items-center justify-center gap-4 flex-col ">
        <input
          type="file"
          id="fileInput"
          accept=".mp4, .avi, .mov, .mkv, .wmv"
          onChange={(e) => handleSelectFile(e.target.files[0])}
          onDrop={(e) => handleSelectFile(e.target.files[0])}
          ref={videoRef}
          hidden
          className={`w-full  h-full bg-yellow-400 relative`}
        />
        <div className="absolute flex flex-col gap-3 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>

          <h1 className="text-center text-3xl font-bold">
            Drag and Drop File <br /> Video to Upload
          </h1>
          <button
            className="border border-gray-500 hover:rounded-xl dark:text-white py-2 px-4 rounded-lg font-semibold"
            onClick={handleOpenInput}
          >
            Or Choose File
          </button>
        </div>
      </div>
    </div>
  );
}