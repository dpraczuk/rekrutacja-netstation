import React from "react";
import { useTags } from "../../hooks/useTagsContext.ts";

export const SearchResultList: React.FC<{
  searchValue: string;
  toggleTag: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchValue, toggleTag }) => {
  const { tags, submitedTags } = useTags();
  const filterBySearchValue = tags.filter((item) =>
    item.tag.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <ul className={"text-sm justify-center py-4 border-t border-gray-200"}>
      {filterBySearchValue.map((item) => {
        return (
          <li
            key={item.uid}
            className="flex justify-between items-center py-1 w-full my-0.5 truncate px-2 hover:bg-gray-200 rounded-md"
          >
            <div className="flex items-center gap-2 w-52 text-ellipsis">
              <input
                type="checkbox"
                defaultChecked={
                  !!submitedTags.find((tag) => tag.uid === item.uid)
                }
                value={item.uid}
                onChange={toggleTag}
              />
              <p className="truncate">{item.tag}</p>
            </div>
            <p className="text-end text-xs text-gray-500 font-semibold">
              +{item.relatedTags}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
