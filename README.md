# Netstation Recruitment Task for Frontend Developer

## Overview

This documentation provides an overview of the Tags Manegement App, which I developed as part of a recruitment task for a frontend developer position. The application allows user to add and remove tags. It was build with React, Typescript, Vite tooling and simple json file as a mockup of backend.

## Installation, setup & running the App

### Prerequisites

- Node.js (v.18 or later),
- npm (v.9 or later)

### Steps

1. **Install dependencies:**

```
npm install
```

2. **Start application:**

```
npm run dev
```

3. **Open the application in your web browser:**
   Navigate to `http://localhost:5173`.

## Frontend Implementation

### React Components

**`App.tsx`**
Main component of the application that renders whole **Navigation** component with wrapped **TagsContext** overt it.

```typescript
import { Navigation } from "./components/Navigation/Navigation";
import { TagsProvider } from "./stores/TagsContext";

export function App() {
  return (
    <TagsProvider>
      <Navigation />
    </TagsProvider>
  );
}

export default App;
```

**`Navigation.tsx`**
Komponent odpowiada za nawigowanie użytkownika po interfejsie aplikacji. Zaimplementowany został tak, by łatwo było go rozszerzać o nawigowalne ścieżki. It also includes a Tooltip component which is responsible for displaying tooltips when the mouse hovers over an icon.

```typescript
import { useState } from "react";
import {
  InformationIcon,
  InformationVariant,
  MessageIcon,
  ProfileIcon,
  SettingsIcon,
  TagIcon,
  TagVariant,
} from "../Icons/index.ts";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "../Tooltip/Tooltip.tsx";
import {
  ModalType,
  NavigationModal,
} from "../NavigationModal/NavigationModal.tsx";

const iconsStyle = "stroke-gray-500";

const navigationItems = [
  {
    id: 1,
    iconComponent: (
      <InformationIcon
        variant={InformationVariant.DEFAULT}
        className={iconsStyle}
      />
    ),
    tooltipText: "Informacje",
    keyBind: "",
    type: null,
  },
  {
    id: 2,
    iconComponent: <MessageIcon className={iconsStyle} />,
    tooltipText: "Wiadomości",
    keyBind: null,
    type: null,
  },
  {
    id: 3,
    iconComponent: <SettingsIcon className={iconsStyle} />,
    tooltipText: "Opcje",
    keyBind: null,
    type: null,
  },
  {
    id: 4,
    iconComponent: (
      <TagIcon variant={TagVariant.DEFAULT} className={iconsStyle} />
    ),
    tooltipText: "Dodawanie tagów",
    keyBind: "⌘T",
    type: ModalType.TAG,
  },
  {
    id: 5,
    iconComponent: <ProfileIcon className={iconsStyle} />,
    tooltipText: "Profil",
    keyBind: null,
    type: null,
  },
];

export const Navigation: React.FC<{}> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <nav>
      <ul
        className={
          "relative flex flex-col p-2 gap-1 border border-gray-200 w-fit" +
          " rounded-lg" +
          " mt-10 shadow-sm"
        }
      >
        {navigationItems.map((navigationItem) => (
          <li key={navigationItem.id}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => {
                    if (navigationItem.type && !isModalOpen) {
                      setIsModalOpen(true);
                    } else {
                      handleModalClose();
                    }
                  }}
                  className={
                    "flex items-center justify-center" +
                    " hover:bg-gray-200 p-1 w-fit rounded-md"
                  }
                >
                  {navigationItem.iconComponent}
                </TooltipTrigger>
                <TooltipContent
                  className={"flex gap-4 bg-black text-white" + " text-xs mr-2"}
                  side={"left"}
                >
                  <p>{navigationItem.tooltipText}</p>
                  {navigationItem.keyBind ? (
                    <p className={"key-bind"}>{navigationItem.keyBind}</p>
                  ) : (
                    ""
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {isModalOpen && navigationItem.type && (
              <NavigationModal
                closeModal={handleModalClose}
                type={navigationItem.type}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

**`SearchByTag.tsx`**
Wrapper component for most part of feature logic f.e **SearchInput** state and marked tags which is state for checkbox inputs from **SearchResultList**.

```typescript
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
```

**`SearchResultList.tsx`**
Component that contains search results based on search value string.

```typescript
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
```

**`SubmitedTagsList.tsx`**
Component that contains tags submited by user.

```typescript
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
```

**`TagsRateScale.tsx`**
Component that displays scale of how many tags we need to go.

```typescript
import React from "react";
import { InformationIcon, InformationVariant } from "../Icons";

export const TagsRateScale: React.FC<{
  tagsAmount: number;
}> = ({ tagsAmount }) => {
  const tagsFullfilled = new Array(tagsAmount).fill(0);
  const tagsUnfullfilled = new Array(tagsAmount > 5 ? 0 : 5 - tagsAmount).fill(
    0
  );

  const renderScaleParagraph = () => {
    if (tagsAmount <= 3) {
      return <p className="text-sm font-semibold text-red-500">Słabo</p>;
    } else {
      return <p className="text-sm font-semibold text-green-500">Dobrze</p>;
    }
  };

  const renderInformation = () => {
    if (tagsAmount < 5) {
      return (
        <div className="flex items-center gap-2">
          <div>
            <InformationIcon
              className="fill-gray-400 w-5"
              variant={InformationVariant.SOLID}
            />
          </div>
          <p className="text-sm mt-2 text-gray-500">
            Zbyt mało tagów. Dodaj jeszcze {5 - tagsAmount} aby poprawić
            widoczność artykułu
          </p>
        </div>
      );
    } else return;
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        {renderScaleParagraph()}
        <div className="flex gap-1">
          {tagsFullfilled.map((_) => {
            return (
              <div
                className={`h-1 w-3 rounded-full ${
                  tagsAmount <= 3 ? "bg-red-500" : "bg-green-500"
                }`}
              />
            );
          })}
          {tagsUnfullfilled.map((_) => {
            return <div className="h-1 w-3 rounded-full bg-gray-400" />;
          })}
        </div>
      </div>
      {renderInformation()}
    </div>
  );
};
```

**`TagsContext.tsx`**

A file in which data retrieval is simulated and the global state of the application is initialized.

```typescript
import React, { createContext, useEffect, useState } from "react";
import type { Tag } from "../types/types";

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
```

### Styles

In this project I used Tailwind.css, so every class in component represent some CSS values.

### Backend mock

**`tags.json`**
A mock json file to simulate backend.

```json
[
  {
    "uid": "c8c2665d-c6d9-497c-abfb-48b7aee93f26",
    "tag": "Maryla Rodowicz",
    "relatedTags": 40
  },
  {
    "uid": "eb2fa180-b901-4599-904a-99255a132809",
    "tag": "Odmrażanie trupa",
    "relatedTags": 35
  },
  {
    "uid": "249234a3-6226-45c1-bd9d-0b9506c19e87",
    "tag": "Festiwal w Opolu",
    "relatedTags": 32
  },
  {
    "uid": "19987887-f54d-4c5d-b2c3-95e32fb8c8ed",
    "tag": "Legendy polskiej sceny muzycznej",
    "relatedTags": 30
  },
  {
    "uid": "8d184089-a0dc-4fd1-93f1-c43afd1ca4ec",
    "tag": "Przeboje lat 70",
    "relatedTags": 26
  },
  {
    "uid": "7ff7b085-ea7f-40a8-a699-e3faa0ccf4d4",
    "tag": "Ikonka popkultury",
    "relatedTags": 25
  },
  {
    "uid": "d2514ba3-b5f9-4c25-b7f8-cf4caeb8b082",
    "tag": "Polska muzyka",
    "relatedTags": 17
  },
  {
    "uid": "589b2326-29cc-4823-911d-eb7ca88dae29",
    "tag": "Kabaret",
    "relatedTags": 12
  }
]
```
