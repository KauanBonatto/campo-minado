import { Button } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ButtonThemeMode = () => {
  let DARK = "dark",
    LIGHT = "light";

  const [themeMode, setThemeMode] = useState(DARK);

  function changeMode() {
    const theme = document.documentElement.classList.contains(LIGHT)
      ? LIGHT
      : DARK;
    setThemeMode(theme === LIGHT ? DARK : LIGHT);
    document.documentElement.classList.toggle(LIGHT);
    document.documentElement.classList.toggle(DARK);
  }

  return (
    <Button
      className="fixed right-5 bottom-5 bg-slate-800 hover:bg-slate-800/80 dark:bg-slate-100 dark:hover:bg-slate-100/80 rounded-full"
      onClick={changeMode}
    >
      <FontAwesomeIcon
        className="text-xl text-white dark:text-slate-600"
        icon={themeMode === LIGHT ? faMoon : faSun}
      />
    </Button>
  );
};

ButtonThemeMode.displayName = "ButtonThemeMode";

export { ButtonThemeMode };
