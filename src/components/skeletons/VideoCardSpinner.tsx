import React from "react";
import { fakeArray_2 } from "@/assets/constant";
export default function VideoCardSpinner() {
  return (
    <div className="w-full px-2">
      <div className="2xl:grid-cols-6 grid-col-1 xl:grid-cols-4 sm:grid-cols-3 grid gap-x-4 gap-y-2 sm:gap-y-6 px-1 md:px-2   ">
        {fakeArray_2.map((item, i) => {
          return (
            <div
              className="flex flex-col  animate-pulse  h-full justify-center flex-grow-2 flex-shrink mb-6    "
              key={i}
            >
              <div className=" aspect-[16/9]   bg-gray-300 dark:bg-gray-700  rounded-xl mb-1 "></div>

              <div className="flex items-center gap-3  ">
                <div className="w-9 bg-gray-300 dark:bg-gray-700 h-9 rounded-full "></div>
                <div>
                  <div className="w-[160px] bg-gray-300 dark:bg-gray-700 h-3.5 my-3 rounded-sm "></div>

                  <div className="w-[130px] bg-gray-300 dark:bg-gray-700 h-3 rounded-sm "></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
      }