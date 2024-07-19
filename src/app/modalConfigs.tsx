"use client";

import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import Modal from "./modal";
import { Button, Input } from "./components/ui";
import type { GameConfigProps } from "./page";

interface Props {
  modalConfigOpen: boolean;
  setModalConfigOpen: Dispatch<SetStateAction<boolean>>;
  setGameConfig: Dispatch<SetStateAction<GameConfigProps>>;
}

interface ConfigOutros {
  qtdRows: number;
  qtdColumns: number;
  qtdBombs: number;
}

const ModalConfig: FC<Props> = ({
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
      [event.target.name]: parseFloat(event.target.value),
    });
  };

  return (
    <Modal
      open={modalConfigOpen}
      title="CONFIGURAÇÕES"
      renderContent={
        isPersonalized ? (
          <div className="flex w-full h-full items-end m-aut flex-wrap justify-center gap-4">
            <Input
              textLabel="Número de Colunas"
              name="qtdColumns"
              className="bg-slate-700 text-white w-full"
              type="number"
              onChange={(e) => handleChangeOutros(e)}
              value={configOutros.qtdColumns}
            />
            <Input
              textLabel="Número de Linhas"
              name="qtdRows"
              className="bg-slate-700 text-white w-full"
              type="number"
              onChange={(e) => handleChangeOutros(e)}
              value={configOutros.qtdRows}
            />
            <Input
              textLabel="Número de Bombas"
              name="qtdBombs"
              className="bg-slate-700 text-white w-full"
              type="number"
              onChange={(e) => handleChangeOutros(e)}
              value={configOutros.qtdBombs}
            />
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <Button
                theme="bg-slate-500 text-slate-900 hover:bg-slate-500/80"
                onClick={() => setIsPersonalized(false)}
              >
                TROCAR LEVEL
              </Button>
              <Button className="w-full" onClick={() => handleLevelOutros()}>
                JOGAR
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center m-auto">
            <div className="flex justify-center w-full flex-wrap gap-4">
              {levels.map((level, index) => {
                if (level.levelSelected) {
                  return (
                    <div key={index}>
                      <Button
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
                      </Button>
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <Button onClick={() => setIsPersonalized(true)}>
                        {level.name}
                      </Button>
                    </div>
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
