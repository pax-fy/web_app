import React from "react";
import { fakeArray_2 } from "@/assets/constant";
export default function ShortsSkeleton() {
  return (
    <div className="w-full pl-3 ">
      <div className=" hidden md:flex gap-6 items-center justify-center pt-2  overflow-x-hidden   ">
        {fakeArray_2.map((item, i) => {
          return (
            <div
              className="flex flex-col  animate-pulse  p-1 justify-center flex-grow-2 flex-shrink "
              key={i}
            >
              <div className="  mx-auto h-[350px] w-[200px] md:w-[210px]  lg:w-[230px]  bg-gray-300 dark:bg-gray-700  rounded-xl mb-1 "></div>

             
            </div>
          );
        })}
      </div>
    </div>
  );
      }
