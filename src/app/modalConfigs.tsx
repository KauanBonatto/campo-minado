"use client";

import Modal from "./modal";

import type { GameConfigProps } from "./page";

interface Props {
  modalConfigOpen: boolean;
  setModalConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGameConfig: React.Dispatch<React.SetStateAction<GameConfigProps>>;
}

const ModalConfig: React.FC<Props> = ({ modalConfigOpen, setModalConfigOpen, setGameConfig }) => {
  const handleLevelSelect = (value: GameConfigProps) => {
    setGameConfig(value);
    setModalConfigOpen(false);
  };

  return (
    <Modal open={modalConfigOpen} title="CONFIGURAÇÕES" renderContent={
      <div className="flex w-full h-full items-center m-auto">
        <div className="flex w-full h-min flex-col gap-8">
          <div className="flex m-auto gap-4 w-full max-w-xl">
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => handleLevelSelect({ levelSelected: '1', qtdRows: 5, qtdColumns: 5, qtdBombs: 3 })} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">NÍVEL 1</p>
            </div>
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => handleLevelSelect({ levelSelected: '2', qtdRows: 8, qtdColumns: 8, qtdBombs: 6 })} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">NÍVEL 2</p>
            </div>
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => handleLevelSelect({ levelSelected: '3', qtdRows: 10, qtdColumns: 10, qtdBombs: 15 })} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">NÍVEL 3</p>
            </div>
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => handleLevelSelect({ levelSelected: '4', qtdRows: 12, qtdColumns: 12, qtdBombs: 28 })} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">NÍVEL 4</p>
            </div>
          </div>
          <div className="flex m-auto gap-4 w-full max-w-xl">
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => handleLevelSelect({ levelSelected: '5', qtdRows: 15, qtdColumns: 15, qtdBombs: 32 })} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">NÍVEL 5</p>
            </div>
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => handleLevelSelect({ levelSelected: '6', qtdRows: 18, qtdColumns: 18, qtdBombs: 58 })} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">NÍVEL 6</p>
            </div>
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => alert('EM DESENVOLVIMENTO...')} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">INFINITO</p>
            </div>
            <div className="w-1/4 flex justify-center cursor-pointer">
              <p onClick={() => alert('EM DESENVOLVIMENTO...')} className="flex-1 p-3 bg-black text-white border border-black text-center font-bold rounded-md transition-all hover:bg-white hover:text-black">OUTRO</p>
            </div>
          </div>
        </div>
      </div>
    } />
  );
};

export default ModalConfig;
