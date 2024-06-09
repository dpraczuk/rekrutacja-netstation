import React from "react";
import { CrossIcon } from "../Icons";
import { useTags } from "../../hooks/useTagsContext";

export const SubmitedTagsList: React.FC<{}> = ({}) => {
  const { submitedTags, removeSelectedTag } = useTags();
  return (
    <ul className="flex flex-wrap gap-y-2 gap-x-2 border-t py-3">
      {submitedTags.map((item) => {
        return (
          <li
            key={item.uid}
            className="flex text-sm items-center gap-4 py-1 px-3 border border-gray-200 rounded-lg"
          >
            <p className="line-clamp-1 font-semibold">{item.tag}</p>
            <button onClick={() => removeSelectedTag(item.uid)}>
              <CrossIcon className="w-5 h-5 stroke-gray-500" />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
