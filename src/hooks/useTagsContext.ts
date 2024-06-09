import { useContext } from "react";
import { TagsContext } from "../stores/TagsContext";

export const useTags = () => {
  const context = useContext(TagsContext);

  if (context === undefined) {
    throw new Error("useTags must be used inside a TagsProvider");
  }

  return context;
};
