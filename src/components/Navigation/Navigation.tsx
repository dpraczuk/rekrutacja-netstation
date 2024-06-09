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
