import React from "react";
import { cn } from "../../utils/utils.ts";
import { CrossIcon, SearchIcon } from "../Icons/index.ts";

export const SearchInput: React.FC<{
  searchValue: string;
  changeInputValue: (value: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
  className?: string;
  placeholder?: string;
}> = ({
  searchValue,
  changeInputValue,
  clearInput,
  className,
  placeholder,
}) => {
  return (
    <div className={"relative"}>
      <input
        placeholder={placeholder}
        value={searchValue}
        onChange={changeInputValue}
        className={cn("outline-0", className)}
      />
      <SearchIcon className={"absolute top-1.5 w-5 stroke-gray-500"} />
      {searchValue && (
        <button
          onClick={clearInput}
          className={
            "absolute top-2.5" +
            " right-0 bg-gray-400" +
            " p-0.5" +
            " text-white" +
            " rounded-full"
          }
        >
          <CrossIcon className={"w-3 h-3" + " rounded-full"} />
        </button>
      )}
    </div>
  );
};
