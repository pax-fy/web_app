import { fakeArray } from "@/assets/constant";
import React from "react";

export default function ThumbnailsLoadingSpinner() {
  return (
    <div className="flex gap-2 flex-wrap">
      {fakeArray.map((item, i) => {
        return (
          <div
            className="flex flex-col  animate-pulse  h-full justify-center flex-grow-2 flex-shrink"
            key={i}
          >
            <div className=" w-[120px] h-[70px] border border-gray-300  bg-gray-300 dark:bg-gray-800 rounded-xl mb-1 "></div>
          </div>
        );
      })}
    </div>
  );
}