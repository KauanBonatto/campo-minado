import { forwardRef } from "react";
import { Button } from "../ui";

interface MenuGameInterface {
  handleRetry: () => void;
  handleChangeLevel: () => void;
}

const MenuGame = forwardRef<HTMLDivElement, MenuGameInterface>(
  ({ handleRetry, handleChangeLevel }, ref) => {
    return (
      <div
        className="flex flex-col md:flex-row justify-center gap-4 mt-8"
        ref={ref}
      >
        <Button
          theme="bg-slate-500 text-slate-900 hover:bg-slate-500/80"
          onClick={handleRetry}
        >
          TENTAR DE NOVO
        </Button>
        <Button
          theme="bg-slate-500 text-slate-900 hover:bg-slate-500/80"
          onClick={handleChangeLevel}
        >
          TROCAR NÍVEL
        </Button>
      </div>
    );
  }
);

MenuGame.displayName = "MenuGame";

export { MenuGame };
