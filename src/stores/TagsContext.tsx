import React, { createContext, useEffect, useState } from "react";
import type { Tag } from "../types/types";
import "whatwg-fetch";

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [submitedTags, setSubmitedTags] = useState<Tag[]>([]);

  useEffect(() => {
    //fakeAPI
    fetch("https://fake-api-sandy.vercel.app/data")
      .then((response) => response.json())
      .then((data) => setTags(data));
  }, []);

  const changeSelectedTags = (tags: Tag[]) => {
    setSubmitedTags(tags);
  };

  const removeSelectedTag = (tagUid: string) => {
    setSubmitedTags((prev) => prev.filter((item) => item.uid !== tagUid));
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        changeSelectedTags,
        submitedTags,
        removeSelectedTag,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}

export const TagsContext = createContext<
  | {
      tags: Tag[];
      changeSelectedTags: (tags: Tag[]) => void;
      submitedTags: Tag[];
      removeSelectedTag: (tagUid: string) => void;
    }
  | undefined
>(undefined);
