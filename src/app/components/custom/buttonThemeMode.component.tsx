import { Button } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const ButtonThemeMode = () => {
  const changeMode = () => {
    const theme = document.documentElement.classList["value"];
    if (theme === "white") {
      document.documentElement.classList.remove("white");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("white");
    }
  };

  return (
    <Button
      className="fixed right-5 bottom-5 bg-slate-600 hover:bg-slate-400/80 dark:bg-slate-100 dark:hover:bg-slate-100/80 rounded-full"
      onClick={changeMode}
    >
      <FontAwesomeIcon
        className="text-xl text-white dark:text-slate-600"
        icon={faMoon}
        color="black"
      />
    </Button>
  );
};

ButtonThemeMode.displayName = "ButtonThemeMode";

export { ButtonThemeMode };
