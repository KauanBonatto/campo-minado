import { forwardRef } from "react";

const GameVictory = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div className="px-10 py-5 bg-slate-700 rounded-3xl mt-4" ref={ref}>
      <h1 className="flex gap-2 m-auto font-black text-center flex-col text-white">
        VOCÊ VENCEU
        <br />
        <p className=" text-white font-normal">
          A vitória está a poucos passos daquele que não desiste de lutar.
        </p>
      </h1>
    </div>
  );
});

GameVictory.displayName = "GameVictory";

export { GameVictory };
