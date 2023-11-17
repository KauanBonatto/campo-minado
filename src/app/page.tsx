"use client";

import { faker } from "@faker-js/faker";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";

interface SquareProps {
  id: string;
  opened: boolean;
  isBomb: boolean;
  marked: boolean;
  qtdBombsAround: number;
}

export default function Home() {
  const qtdBombas = 4;
  const [matriz, setMatriz] = useState<SquareProps[][]>([]);
  
  const marksRemain = useMemo(() => {
    return qtdBombas - matriz.reduce((marksTotal, row) => (
      marksTotal + row.reduce((marksRow, square) => 
        marksRow + (square.marked ? 1 : 0
      ), 0)
    ), 0);
  }, [matriz]);

  const formarMatriz = (rows: number, columns: number) => {
    const newMatriz: SquareProps[][] = [];

    for (let row = 0; row < rows; row++) {
      const newRow: SquareProps[] = [];

      for (let column = 0; column < columns; column++) {
        const square: SquareProps = {
          id: faker.string.uuid(),
          opened: false,
          isBomb: false,
          marked: false,
          qtdBombsAround: 0,
        };
        newRow.push(square);
      }
      newMatriz.push(newRow);
    }
    setMatriz(newMatriz);
  };

  const markFlag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    squareId: string,
    marked: boolean
  ) => {
    e.preventDefault();

    setMatriz(matriz => {
      const newMatriz = matriz.map(row => {
        return row.map(square => {
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
    formarMatriz(10, 10);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="game">
        <h1 className="text-center font-bold"> MINES - CAMPO MINADO</h1>
        <h2 className="mt-5 font-bold">
          <FontAwesomeIcon icon={faFlag} /> - {marksRemain}
        </h2>
        <table className="flex flex-col justify-center items-center w-min mt-5 m-auto p-3 border rounded-md" onContextMenu={e => e.preventDefault()}>
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
                      onContextMenu={e => markFlag(e, column.id, column.marked)}
                    >
                      {column.marked && (
                        <FontAwesomeIcon icon={faFlag} color="black" />
                      )}
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
