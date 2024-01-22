"use client";

import { ChangeEvent, useState } from "react";
import Modal from "./modal";

import type { GameConfigProps } from "./page";

interface Props {
  modalConfigOpen: boolean;
  setModalConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGameConfig: React.Dispatch<React.SetStateAction<GameConfigProps>>;
}

interface ConfigOutros {
  qtdRows: number;
  qtdColumns: number;
  qtdBombs: number;
}

const ModalConfig: React.FC<Props> = ({
  modalConfigOpen,
  setModalConfigOpen,
  setGameConfig,
}) => {
  const [isPersonalized, setIsPersonalized] = useState<boolean>(false);
  const [configOutros, setConfigOutros] = useState<ConfigOutros>({
    qtdRows: 5,
    qtdColumns: 5,
    qtdBombs: 3,
  });

  const levels = [
    {
      name: "NÍVEL 1",
      levelSelected: "1",
      qtdRows: 5,
      qtdColumns: 5,
      qtdBombs: 3,
    },
    {
      name: "NÍVEL 2",
      levelSelected: "2",
      qtdRows: 8,
      qtdColumns: 8,
      qtdBombs: 6,
    },
    {
      name: "NÍVEL 3",
      levelSelected: "3",
      qtdRows: 10,
      qtdColumns: 10,
      qtdBombs: 15,
    },
    {
      name: "NÍVEL 4",
      levelSelected: "4",
      qtdRows: 12,
      qtdColumns: 12,
      qtdBombs: 28,
    },
    {
      name: "NÍVEL 5",
      levelSelected: "5",
      qtdRows: 15,
      qtdColumns: 15,
      qtdBombs: 32,
    },
    {
      name: "NÍVEL 6",
      levelSelected: "6",
      qtdRows: 18,
      qtdColumns: 18,
      qtdBombs: 58,
    },
    {
      name: "OUTRO",
    },
  ];
  const handleLevelSelect = (value: GameConfigProps) => {
    setGameConfig(value);
    setModalConfigOpen(false);
  };

  const handleLevelOutros = () => {
    handleLevelSelect({
      levelSelected: "OUTROS",
      qtdRows: configOutros.qtdRows,
      qtdColumns: configOutros.qtdColumns,
      qtdBombs: configOutros.qtdBombs,
    });
    setConfigOutros({ qtdRows: 5, qtdColumns: 5, qtdBombs: 3 });
    setIsPersonalized(false);
  };

  const handleChangeOutros = (event: ChangeEvent<HTMLInputElement>) => {
    setConfigOutros({
      ...configOutros,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal
      open={modalConfigOpen}
      title="CONFIGURAÇÕES"
      renderContent={
        isPersonalized ? (
          <div className="flex w-full h-full items-end m-aut flex-wrap justify-center gap-4">
            <div>
              <p className="text-white mb-1">Número de Colunas</p>
              <input
                name="qtdColumns"
                className="bg-slate-700 text-white border rounded-xl p-3"
                type="number"
                onChange={(e) => handleChangeOutros(e)}
                value={configOutros.qtdColumns}
              />
            </div>
            <div>
              <p className="text-white mb-1">Número de Linhas</p>
              <input
                name="qtdRows"
                className="bg-slate-700 text-white border rounded-xl p-3"
                type="number"
                onChange={(e) => handleChangeOutros(e)}
                value={configOutros.qtdRows}
              />
            </div>
            <div>
              <p className="text-white mb-1">Número de Bombas</p>
              <input
                name="qtdBombs"
                className="bg-slate-700 text-white border rounded-xl p-3"
                type="number"
                onChange={(e) => handleChangeOutros(e)}
                value={configOutros.qtdBombs}
              />
            </div>
            <button
              className="py-4 px-10 rounded-2xl bg-slate-100 text-slate-900 text-center font-bold transition-all hover:bg-slate-300"
              onClick={() => handleLevelOutros()}
            >
              JOGAR
            </button>
          </div>
        ) : (
          <div className="flex w-full h-full items-center m-aut">
            <div className="flex justify-center w-full h-min flex-wrap gap-4">
              {levels.map((level) => {
                if (level.levelSelected) {
                  return (
                    <button
                      className="py-4 px-10 rounded-2xl bg-slate-100 text-slate-900 text-center font-bold transition-all hover:bg-slate-300"
                      onClick={() =>
                        handleLevelSelect({
                          levelSelected: level.levelSelected,
                          qtdRows: level.qtdRows,
                          qtdColumns: level.qtdColumns,
                          qtdBombs: level.qtdBombs,
                        })
                      }
                    >
                      {level.name}
                    </button>
                  );
                } else {
                  return (
                    <button
                      className="py-4 px-10 rounded-2xl bg-slate-100 text-slate-900 text-center font-bold transition-all hover:bg-slate-300"
                      onClick={() => setIsPersonalized(true)}
                    >
                      {level.name}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        )
      }
    />
  );
};

export default ModalConfig;
