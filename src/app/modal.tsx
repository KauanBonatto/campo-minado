"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  renderContent: ReactNode;
  handleClose?: () => void;
}

const Modal: FC<Props> = ({ open, title, renderContent, handleClose }) => {
  if (!open) return null;

  return (
    <main className="fixed w-3/4 md:w-1/2 h-max bg-slate-300 dark:bg-slate-700 rounded-[2rem]">
      <div className="p-8 w-full h-full">
        <h1 className="text-slate-700 dark:text-white text-center font-bold mb-8">
          {title}
          {handleClose && (
            <FontAwesomeIcon
              onClick={handleClose}
              className="absolute right-5 text-xl text-red-600 hover:text-red-700 cursor-pointer"
              icon={faClose}
            />
          )}
        </h1>

        {renderContent}
      </div>
    </main>
  );
};

export default Modal;
