import { StateAndProps } from "./pages/StateAndProps";
import { createContext, useEffect, useState } from "react";
import { NavBar } from "./Components/NavBar";

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: (dark: boolean) => void;
};
export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => undefined,
});

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode = (dark: boolean) => {
    setDarkMode(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") toggleDarkMode(true);
    else if (localStorage.getItem("theme") === "light") toggleDarkMode(false);
    else {
      localStorage.setItem("theme", "dark");
      toggleDarkMode(true);
    }
  }, []);
  return (
    <div
      className="bg-white relative flex flex-col items-center gap-12
      md:gap-0
      dark:bg-reactDark3"
    >
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <NavBar />
        <StateAndProps />
      </DarkModeContext.Provider>
    </div>
  );
};

export default App;
