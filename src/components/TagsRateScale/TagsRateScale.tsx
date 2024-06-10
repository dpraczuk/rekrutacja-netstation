import React from "react";
import { InformationIcon, InformationVariant } from "../Icons";

export const tagsMissing = (tagsAmount: number) => {
  return tagsAmount > 5 ? 0 : 5 - tagsAmount;
};

export const TagsRateScale: React.FC<{
  tagsAmount: number;
}> = ({ tagsAmount }) => {
  const tagsFullfilled = new Array(tagsAmount).fill(0);
  const tagsUnfullfilled = new Array(tagsMissing(tagsAmount)).fill(0);

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
