import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { Fragment } from "react";
import { Loader } from "src/components/Elements/Loader";

export type ListBoxOption = {
  id: string;
  name: string;
};

type Props<T, P> = {
  value: T | (() => T);
  onChange: (value: T) => void;
  isLoading: boolean;
  options: P[];
  buttonLabel: (value: T | (() => T)) => string;
};

export const ListBox = <T extends string, P extends ListBoxOption>({
  onChange,
  value,
  options,
  isLoading,
  buttonLabel,
}: Props<T, P>) => {
  return (
    <Listbox disabled={isLoading} onChange={onChange} value={value}>
      <div>
        <Listbox.Button className="relative cursor-pointer  rounded-lg bg-indigo-600  py-2  pl-3 pr-8 text-left text-xs font-semibold text-white shadow-md md:pr-12 md:text-sm">
          <span className="block truncate">{buttonLabel(value)}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            {isLoading ? (
              <Loader
                className="m-auto"
                size="sm"
                theme="white"
                variant="dots"
              />
            ) : (
              <ChevronDownIcon
                aria-hidden="true"
                className="h-4 w-4 text-white md:h-5 md:w-5"
              />
            )}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className=" absolute mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  clsx(
                    "relative cursor-pointer select-none py-2 pl-7 pr-4 md:pl-10",
                    active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                  )
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate text-xs md:text-base ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-indigo-600">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-4 w-4 md:h-5 md:w-5"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
