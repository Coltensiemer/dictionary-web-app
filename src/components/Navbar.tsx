import { useEffect, useState } from "react";
import Logo from "../assets/images/logo.svg";
import Moon from "../assets/images/icon-moon.svg";
import DownArrow from "../assets/images/icon-arrow-down.svg";

interface Props { 
  handleFontFamily: (select: string) => void
  isFontFamily: string; 
}

export default function Navbar(props: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
 



  function DropDown() {
  
    return (
      <div className="absolute z-10 mt-8 p-6  bg-white shadow-xl transition ease-in-out duration-700 ">
        <ol className=" self-start flex flex-col gap-2">
          <li
            onClick={() => props.handleFontFamily("sans serif")}
            value="Sans Serif"
            className="hover:text-purple-primary font-sans "
          >
            Sans Serif
          </li>
          <li
            onClick={() => props.handleFontFamily("serif")}
            value="Serif"
            className="hover:text-purple-primary  font-serif "
          >
            Serif
          </li>
          <li
            onClick={() => props.handleFontFamily("monospace")}
            value="Mono"
            className="hover:text-purple-primary font-mono"
          >
            Mono
          </li>
        </ol>
      </div>
    );
  }

  // the light and dark mode toggle switch
  function LightDarkToggle() {
    return (
      <div className="flex gap-2">
        <input type="checkbox" className="toggle" />
        <img className="relative bottom-1" src={Moon} />
      </div>
    );
  }

  // Fonts - will control drop downs
  function Font() {
    return (
      <div className="flex justify-around gap-4">
        <div className="w-32 flex flex-col">
          <div className="flex self-end gap-1">
            <p>{props.isFontFamily}</p>
            <button onClick={() => setOpen(!isOpen)}>
              <img src={DownArrow} className="h-2 relative" />
            </button>
          </div>
          {isOpen && <DropDown />}
        </div>
        <div className="text-grey-medium">|</div>
        <LightDarkToggle />
      </div>
    );
  }

  return (
    <div className="flex justify-between my-6">
      <img className="h-8 w-8" src={Logo} />
      <Font />
      <p>CHANGE ME</p>
    </div>
  );
}
