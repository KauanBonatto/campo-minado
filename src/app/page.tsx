"use client";

import { faker } from "@faker-js/faker";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";

interface SquareProps {
  id: string;
  opened: boolean;
  isBomb: boolean;
  marked: boolean;
  qtdBombsAround: number;
}

interface Bomb {
  rowIndex: number;
  columnIndex: number;
}

interface GameStateProps {
  rows: number;
  columns: number;
  qtbBombs: number;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameStateProps>({
    rows: 10,
    columns: 10,
    qtbBombs: 12,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [matriz, setMatriz] = useState<SquareProps[][]>([]);

  const newSquare = (row: number, column: number) => {
    return {
      id: faker.string.uuid(),
      opened: false,
      isBomb: false,
      marked: false,
      qtdBombsAround: 0,
      row,
      column,
    };
  };

  const marksRemain = useMemo(() => {
    return (
      gameState.qtbBombs -
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

  const createMatriz = (rows: number, columns: number) => {
    const newMatriz: SquareProps[][] = [];
    for (let row = 0; row < rows; row++) {
      const newRow: SquareProps[] = [];
      for (let column = 0; column < columns; column++) {
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

  const formMatriz = (rows: number, columns: number) => {
    const newMatriz: SquareProps[][] = createMatriz(rows, columns);
    const bombs = generateBombs(rows, columns, gameState.qtbBombs);
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const square = newSquare(row, column);
        square.isBomb = bombs.some(
          (bomb: Bomb) => bomb.rowIndex === row && bomb.columnIndex === column
        );
        square.qtdBombsAround = calculateQtdBombsAround(row, column, bombs);
        newMatriz[row][column] = square;
      }
    }
    setMatriz(newMatriz);
    setLoading(false);
  };

  const generateBombs = (rows: number, columns: number, qtbBombs: number) => {
    const bombs: any = [];
    for (let i = 0; i < qtbBombs; i++) {
      let bombRow = Math.floor(Math.random() * rows);
      let bombColumn = Math.floor(Math.random() * columns);
      while (
        bombs.some(
          (bomb: Bomb) =>
            bomb.rowIndex === bombRow && bomb.columnIndex === bombColumn
        )
      ) {
        bombRow = Math.floor(Math.random() * rows);
        bombColumn = Math.floor(Math.random() * columns);
      }
      bombs.push({ rowIndex: bombRow, columnIndex: bombColumn });
    }
    return bombs;
  };

  const calculateQtdBombsAround = (
    row: number,
    column: number,
    bombs: Bomb[]
  ) => {
    let qtdBombsAround = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          row + i >= 0 &&
          row + i < gameState.rows &&
          column + j >= 0 &&
          column + j < gameState.columns
        ) {
          if (
            bombs.some(
              (bomb) =>
                bomb.rowIndex === row + i && bomb.columnIndex === column + j
            )
          ) {
            qtdBombsAround++;
          }
        }
      }
    }
    return qtdBombsAround;
  };

  const markFlag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    squareId: string,
    marked: boolean
  ) => {
    e.preventDefault();
    setMatriz((matriz) => {
      const newMatriz = matriz.map((row) => {
        return row.map((square) => {
          if (square.id == squareId) {
            square.marked = !marksRemain ? false : !marked;
          }
          return square;
        });
      });
      return newMatriz;
    });
  };

  useEffect(() => {
    formMatriz(gameState.rows, gameState.columns);
  }, []);

  if (loading) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="game">
        <h1 className="text-center font-bold"> MINES - CAMPO MINADO</h1>
        <h2 className="mt-5 font-bold">
          <FontAwesomeIcon icon={faFlag} /> - {marksRemain}
        </h2>
        <table
          className="flex flex-col justify-center items-center w-min mt-5 m-auto p-3 border rounded-md"
          onContextMenu={(e) => e.preventDefault()}
        >
          <tbody>
            {matriz.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="row flex w-min">
                {row.map((column, columnIndex) => (
                  <td
                    key={`column-${columnIndex}`}
                    className="column select-none cursor-pointer"
                  >
                    <div
                      className="square flex w-6 h-6 justify-center items-center bg-slate-200 hover:bg-gray-300 rounded-sm"
                      onContextMenu={(e) =>
                        markFlag(e, column.id, column.marked)
                      }
                      //onClick={}
                    >
                      {column.marked && (
                        <FontAwesomeIcon icon={faFlag} color="black" />
                      )}
                      {column.isBomb && (
                        <FontAwesomeIcon icon={faBomb} color="black" />
                      )}
                      {!column.isBomb && <p>{column.qtdBombsAround}</p>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
