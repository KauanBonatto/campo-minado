"use client";

import { faker } from "@faker-js/faker";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useMemo, useState } from "react";

import ModalConfig from "./modalConfigs";

interface SquareProps {
  id: string;
  opened: boolean;
  marked: boolean;
  isBomb: boolean;
  qtdBombsAround: number;
}

interface BombProps {
  rowIndex: number;
  columnIndex: number;
}

export interface GameConfigProps {
  levelSelected: string;
  qtdRows: number;
  qtdColumns: number;
  qtdBombs: number;
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [modalConfigOpen, setModalConfigOpen] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [matriz, setMatriz] = useState<SquareProps[][]>([]);
  const [gameConfig, setGameConfig] = useState<GameConfigProps>({} as GameConfigProps);

  const newSquare = (row: number, column: number, bombs: BombProps[]) => {
    return {
      id: faker.string.uuid(),
      opened: false,
      marked: false,
      isBomb: isSquareBomb(bombs, row, column),
      qtdBombsAround: calculateQtdBombsAround(row, column, bombs),
      row,
      column,
    };
  };

  const marksRemain = useMemo(() => {
    return (
      gameConfig.qtdBombs -
      matriz.reduce(
        (marksTotal, row) =>
          marksTotal +
          row.reduce(
            (marksRow, square) => marksRow + (square.marked ? 1 : 0),
            0
          ),
        0
      )
    );
  }, [matriz]);

  const createMatriz = () => {
    const newMatriz: SquareProps[][] = [];
    for (let row = 0; row < gameConfig.qtdRows; row++) {
      const newRow: SquareProps[] = [];
      for (let column = 0; column < gameConfig.qtdColumns; column++) {
        newRow.push({
          id: faker.string.uuid(),
          opened: false,
          isBomb: false,
          marked: false,
          qtdBombsAround: 0,
        });
      }
      newMatriz.push(newRow);
    }
    return newMatriz;
  };

  const createGame = () => {
    const newMatriz: SquareProps[][] = createMatriz();
    const bombs: BombProps[] = generateBombs();
    for (let rowIndex = 0; rowIndex < gameConfig.qtdRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < gameConfig.qtdColumns; columnIndex++) {
        const square = newSquare(rowIndex, columnIndex, bombs);
        newMatriz[rowIndex][columnIndex] = square;
      }
    }
    setMatriz(newMatriz);
    setLoading(false);
  };

  const generateBombs = () => {
    const bombs: BombProps[] = [];
    for (let i = 0; i < gameConfig.qtdBombs; i++) {
      let bombRow = Math.floor(Math.random() * gameConfig.qtdRows);
      let bombColumn = Math.floor(Math.random() * gameConfig.qtdColumns);
      while (isSquareBomb(bombs, bombRow, bombColumn)) {
        bombRow = Math.floor(Math.random() * gameConfig.qtdRows);
        bombColumn = Math.floor(Math.random() * gameConfig.qtdColumns);
      }
      bombs.push({ rowIndex: bombRow, columnIndex: bombColumn });
    }
    return bombs;
  };

  const isSquareBomb = (bombs: BombProps[], rowIndex: number, columnIndex: number) => {
    return bombs.some(
      (bomb: BombProps) =>
        bomb.rowIndex === rowIndex && bomb.columnIndex === columnIndex
    );
  };

  const calculateQtdBombsAround = (
    row: number,
    column: number,
    bombs: BombProps[]
  ) => {
    let qtdBombsAround = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          row + i >= 0 &&
          row + i < gameConfig.qtdRows &&
          column + j >= 0 &&
          column + j < gameConfig.qtdColumns
        ) {
          if (isSquareBomb(bombs, row + i, column + j)) {
            qtdBombsAround++;
          }
        }
      }
    }
    return qtdBombsAround;
  };

  const markFlag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowIndex: number, 
    columnIndex: number,
    marked: boolean
  ) => {
    e.preventDefault();
    setMatriz(prevState => {
      const newMatriz = [...prevState];
      newMatriz[rowIndex][columnIndex].marked = !marksRemain ? false : !marked;
      return newMatriz;
    });
  };

  const openSquare = (rowIndex: number, columnIndex: number) => {
    setMatriz(prevState => {
      const newMatriz = [...prevState];
      newMatriz[rowIndex][columnIndex].opened = true;
      newMatriz[rowIndex][columnIndex].marked = false;

      if (newMatriz[rowIndex][columnIndex].isBomb) {
        gameOver();
      }

      if (newMatriz[rowIndex][columnIndex].qtdBombsAround == 0) {
        openSquaresAround(rowIndex, columnIndex);
      }

      return newMatriz;
    });

  };

  const openSquaresAround = (rowIndex: number, columnIndex: number) => {
    const newMatriz = [...matriz];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          rowIndex + i >= 0 &&
          rowIndex + i < gameConfig.qtdRows &&
          columnIndex + j >= 0 &&
          columnIndex + j < gameConfig.qtdColumns &&
          !newMatriz[rowIndex + i][columnIndex + j].opened
        ) {
            newMatriz[rowIndex + i][columnIndex + j].opened = true;
            newMatriz[rowIndex + i][columnIndex + j].marked = false;

            if (newMatriz[rowIndex + i][columnIndex + j].qtdBombsAround == 0) {
              openSquaresAround(rowIndex + i, columnIndex + j);
            }
        }
      }
    }

    setMatriz(newMatriz);
  };

  const gameOver = () => {
    setMatriz((prevState: SquareProps[][]) => {
      const newMatriz = prevState.map(row => {
        return row.map(column => {
          return { ...column, opened: true, marked: false };
        });
      });
  
      return newMatriz;
    });

    setIsGameOver(true);
  };

  const handleRetry = () => {
    setGameConfig(prevState => {
      const newState = {...prevState};
      return newState;
    });

    setIsGameOver(false);
  };

  const handleChangeLevel = () => {
    setModalConfigOpen(true)
    setIsGameOver(false);
  };

  useEffect(() => {
    createGame();
  }, [gameConfig]);

  if (loading) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-900">
      {!modalConfigOpen && <div id="game">
        <h1 className="flex gap-2 m-auto w-max font-bold flex-col text-white">
          CAMPO MINADO - NÍVEL {gameConfig.levelSelected}
          <div>
            <FontAwesomeIcon icon={faFlag} /> - {marksRemain}
          </div>
        </h1>
        <table
          className="flex flex-col justify-center items-center w-min mt-5 m-auto p-3 border rounded-md "
          onContextMenu={(e) => e.preventDefault()}
        >
          <tbody>
            {matriz.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="row flex w-min">
                {row.map((column, columnIndex) => (
                  <td
                    key={`column-${columnIndex}`}
                    className={`column  ${!column.opened && 'cursor-pointer'}`}
                  >
                    <div
                      {...(!column.opened ? { 
                        onClick: () => openSquare(rowIndex, columnIndex), 
                        onContextMenu: (e) => markFlag(e, rowIndex, columnIndex, column.marked),
                        className: "square flex w-6 h-6 justify-center items-center bg-slate-200 hover:bg-gray-300 cursor-pointer rounded-sm"
                      } : {
                        className: "square flex w-6 h-6 justify-center items-center bg-gray-400 cursor-default rounded-sm"
                      })}
                    >
                      {column.opened ? (
                        <Fragment>
                          {column.isBomb ? (
                            <FontAwesomeIcon icon={faBomb} color="black" />
                          ) : (
                            <p>{column.qtdBombsAround > 0 && column.qtdBombsAround}</p>
                          )}
                        </Fragment>
                      ) : (
                        <Fragment>
                          {column.marked && (
                            <FontAwesomeIcon icon={faFlag} color="black" />
                          )}
                        </Fragment>
                      )}

                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {isGameOver && <div className="flex justify-center gap-4 mt-8">
            <div onClick={handleRetry} className="p-3 border font-bold rounded-md  cursor-pointer transition-all text-white hover:bg-white hover:text-black hover:border-black">TENTAR DE NOVO</div>
            <div onClick={handleChangeLevel} className="p-3 border font-bold rounded-md  cursor-pointer transition-all text-white hover:bg-white hover:text-black hover:border-black">TROCAR NÍVEL</div>
          </div>}
        </div>
      }

      <ModalConfig modalConfigOpen={modalConfigOpen} setModalConfigOpen={setModalConfigOpen} setGameConfig={setGameConfig} />
    </main>
  );
}
