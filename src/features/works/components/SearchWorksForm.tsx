import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Input } from "src/components/Elements/Input/Input";
import { useSearchWorks } from "src/features/works/hooks/useSearchWorks";

export const SearchWorksForm = () => {
  const { submitHandler, setSearch, search } = useSearchWorks();

  return (
    <form className="hidden w-full space-x-4 md:flex" onSubmit={submitHandler}>
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 stroke-indigo-500" />
        <Input
          className="peer px-8"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="タイトルで検索"
          type="text"
          value={search}
        />
        <button
          className="absolute top-1/2 right-2 block -translate-y-1/2 rounded-full bg-indigo-50 p-1 peer-placeholder-shown:hidden"
          onClick={() => setSearch("")}
          type="button"
        >
          <XMarkIcon className=" h-3 w-3  cursor-pointer fill-white stroke-indigo-500 stroke-2" />
        </button>
      </div>
    </form>
  );
};
