import React, { FC } from "react";

export const NextEpisodeMenuSkelton: FC = () => (
  <section className="px-4 py-2">
    <div className="mb-2 h-2 w-16 rounded-md bg-slate-200" />
    <div className="mb-2 h-3 w-4/5 rounded-md bg-slate-200" />
    <div className="mb-2 h-2 w-1/2 rounded-md bg-slate-200" />
    <div className="flex place-items-center">
      <div className="mr-2 h-4 w-4 rounded-md bg-slate-200" />
      <div className="h-4 w-20 rounded-md bg-slate-200" />
    </div>
  </section>
);
