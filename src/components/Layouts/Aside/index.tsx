import React from "react";
import { Nav } from "src/components/Layouts/Nav";
import { SearchWorks } from "src/features/works/components/SearchWorks";
import { SearchWorksForm } from "src/features/works/components/SearchWorksForm";

export const Aside = () => (
  <aside className="w-full border-b border-b-slate-200 pb-4 md:block md:w-56 md:border-b-0">
    <div className="container sticky top-8 mx-auto md:space-y-4">
      <SearchWorksForm />
      <Nav />
      <div className="hidden max-w-full overflow-hidden md:block">
        <SearchWorks />
      </div>
    </div>
  </aside>
);
