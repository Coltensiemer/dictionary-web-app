import { useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import "./styles/App.css";

function App() {
  const [isFontFamily, setFontFamily] = useState<string>("sans serif");

  function handleFontFamily(select: string) {
    setFontFamily(select);
  }

  return (
    <div className="flex flex-col justify-center mx-6">
      <Navbar handleFontFamily={handleFontFamily} isFontFamily={isFontFamily} />
      <Search />
    </div>
  );
}

export default App;
