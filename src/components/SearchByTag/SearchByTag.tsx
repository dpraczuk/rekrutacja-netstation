import React, { useEffect, useState } from "react";
import {
  CrossIcon,
  SparklesIcon,
  TagIcon,
  SparklesVariant,
  TagVariant,
} from "../Icons/index.ts";
import { SearchInput } from "../SearchInput/SearchInput.tsx";
import { useTags } from "../../hooks/useTagsContext.ts";
import type { Tag } from "../../types/types.ts";
import { TagsRateScale } from "../TagsRateScale/TagsRateScale.tsx";
import { SearchResultList } from "../SearchResultList/SearchResultList.tsx";
import { SubmitedTagsList } from "../SubmitedTagsList/SubmitedTagsList.tsx";

export const SearchByTag: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const { tags, changeSelectedTags, submitedTags } = useTags();
  const [searchValue, setSearchValue] = useState<string>("");
  const [markedTags, setMarkedTags] = useState<Tag[]>([]);

  const changeInputValue = (value: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value.target.value);
  };

  const clearInputValue = () => {
    setSearchValue("");
  };

  const tagsSubmit = () => {
    changeSelectedTags(markedTags);
    setSearchValue("");
  };

  const toggleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggledTag = tags.find((item) => item.uid === e.currentTarget.value);

    if (
      toggledTag?.uid &&
      !markedTags.find((item) => item.uid === e.currentTarget.value)
    ) {
      setMarkedTags((prev) => [...prev, toggledTag]);
    } else {
      setMarkedTags((prev) =>
        prev.filter((item) => item.uid !== toggledTag?.uid)
      );
    }
  };

  useEffect(() => {
    if (submitedTags) {
      setMarkedTags(submitedTags);
    }
  }, [submitedTags]);

  return (
    <div>
      <div className={"flex justify-between items-center mb-5"}>
        <h1 className={"font-semibold text-2xl"}>Tagi</h1>
        <button onClick={closeModal}>
          <CrossIcon className={"stroke-gray-500"} />
        </button>
      </div>
      <SearchInput
        searchValue={searchValue}
        changeInputValue={changeInputValue}
        placeholder={"Wyszukaj grupę lub tag"}
        clearInput={clearInputValue}
        className={"text-sm" + " w-full" + " py-2 px-7"}
      />
      {searchValue ? (
        <>
          <SearchResultList searchValue={searchValue} toggleTag={toggleTag} />
          <button
            disabled={!markedTags.length && !submitedTags.length}
            className="mx-auto w-full bg-blue-500 py-2 rounded-lg text-white font-semibold mt-2 disabled:bg-gray-300"
            onClick={tagsSubmit}
          >
            Zapisz
          </button>
        </>
      ) : (
        <>
          {submitedTags.length ? (
            <SubmitedTagsList />
          ) : (
            <p className="w-full text-center border-t border-gray-200 py-3 text-sm text-gray-500">
              Nie wybrano tagów
            </p>
          )}
          <div className={"flex flex-col gap-4 border-t border-b py-4"}>
            <div className={"flex gap-2 items-center"}>
              <SparklesIcon
                variant={SparklesVariant.SOLID}
                className={"fill-gray-400 w-5"}
              />
              <p className={"text-sm text-gray-400 font-semibold"}>CMS AI</p>
            </div>
            <div className={"flex items-center gap-2"}>
              <SparklesIcon
                variant={SparklesVariant.DEFAULT}
                className={"stroke-violet-500" + " w-5"}
              />
              <p className={"text-sm"}>Analizuj tekst</p>
            </div>
            <div className={"flex items-center gap-2"}>
              <TagIcon
                variant={TagVariant.SOLID}
                className={"fill-violet-500 w-5"}
              />
              <p className={"text-sm"}>Najbardziej popularne tagi</p>
            </div>
          </div>
          <TagsRateScale tagsAmount={submitedTags.length} />
        </>
      )}
    </div>
  );
};
