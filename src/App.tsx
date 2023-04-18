import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import "./styles/App.css";

function App() {

  // States 
  const [isFontFamily, setFontFamily] = useState<string>("sans-serif");
  const [isDarkModeTheme, setDarkModeTheme] = useState<boolean>(false);

  const darkModeHandle = isDarkModeTheme ? "dark" : "";
  function toggleDarkMode(prev: boolean):void {
    setDarkModeTheme((prev) => !prev); 

  }

  // Handle DOM for font familys
  function handleFontFamily(select: string) {
    setFontFamily(select);
    document.body.style.fontFamily = select;
  }

  return (
    <div className="flex flex-col justify-center  dark:bg-red-500">
      <div className={darkModeHandle}>
      <Navbar 
      handleFontFamily={handleFontFamily} 
      isFontFamily={isFontFamily}
      darkModeTheme={isDarkModeTheme}
      toggleDarkMode={toggleDarkMode}

       />
      <Search />
      </div> 
      </div>
  );
}

export default App;
