import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";

import React from "react";
import { EpisodeMenuSkeleton } from "src/components/Elements/Skeleton/items/EpisodeMenuSkeleton";
import { TimerSkeleton } from "src/components/Elements/Skeleton/items/TimerSkeleton";

export const EpisodeSkeleton = () => (
  <div className="flex flex-1 flex-col">
    <div className="container contents lg:mx-auto lg:flex" role="status">
      <div className="w-full flex-1 rounded-md ">
        <div className="mx-auto flex animate-pulse flex-col items-center justify-between p-4  md:px-6">
          <div className="mb-1 h-6 w-52 rounded-md bg-slate-200 md:mb-2" />
          <div className="mb-2 flex h-4 w-full  ">
            <div className="mr-4 h-4 w-1/12 rounded-md bg-slate-200" />
            <div className="flex-1 rounded-md bg-slate-200" />
          </div>
          <div className="flex flex-col">
            <div className="m-0 mx-auto mb-2.5 h-5  w-32 rounded-md bg-slate-200 px-10" />
            <TimerSkeleton />
          </div>
        </div>
        <div className="mt-3 flex  animate-pulse items-center justify-between border-0 border-b border-solid border-slate-200  p-4 py-2 md:px-6 lg:flex-col lg:items-stretch">
          <div className="flex flex-1 items-center justify-between">
            <ArrowSmallLeftIcon className="h-6 w-6 text-slate-200" />
            <div className="ml-2 h-6 w-20 rounded-md bg-slate-200" />
            <div className="ml-2 h-6 w-20 rounded-md bg-slate-200" />
            <div className="h-8 w-8 " />
          </div>
          <EpisodeMenuSkeleton />
        </div>
      </div>
      <main className="flex-1 lg:w-[36rem] lg:flex-none lg:pb-16" />
    </div>
  </div>
);
