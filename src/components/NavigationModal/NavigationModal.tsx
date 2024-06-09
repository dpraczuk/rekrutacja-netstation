import React from "react";
import { SearchByTag } from "../SearchByTag/SearchByTag.tsx";

export enum ModalType {
  TAG = "tag",
}

export const NavigationModal: React.FC<{
  type: ModalType;
  closeModal: () => void;
}> = ({ type, closeModal }) => {
  const renderContent = () => {
    if (type === ModalType.TAG) {
      return <SearchByTag closeModal={closeModal} />;
    }
  };
  return (
    <div
      className={
        "absolute top-0 ml-2 left-full w-80 border border-gray-200 rounded-lg" +
        " px-4 py-5 bg-white"
      }
    >
      {renderContent()}
    </div>
  );
};
