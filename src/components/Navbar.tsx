import { useEffect, useState, } from "react";
import  Logo from "../assets/images/logo.svg";
// @ts-ignore
import { ReactComponent as Moon }  from "../assets/images/icon-moon.svg";
// @ts-ignore
import {ReactComponent as DownArrow }  from "../assets/images/icon-arrow-down.svg";

interface Props { 
  handleFontFamily: (select: string) => void
  isFontFamily: string; 
  darkModeTheme: boolean;  
  toggleDarkMode: (prev: boolean) => void 
}

export default function Navbar(props: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);

  

    /**
   * Toggles the value of the `isToggle` state variable and calls the
   * `toggleDarkMode` function with the new value.
   */
   function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const isChecked = event.target.checked;
    props.toggleDarkMode(isChecked);
  }


  function DropDown() {
  
    return (
      <div  className="absolute z-10 mt-8 p-6  bg-white dark:bg-black-primary dark:text-white shadow-xl dark:shadow-purple-primary transition ease-in-out duration-700 ">
        <ol className=" self-start flex flex-col gap-2">
          <li
            onClick={() => props.handleFontFamily("sans-serif")}
            value="Sans Serif"
            className="hover:text-purple-primary font-sans "
          >
            Sans-Serif
          </li>
          <li
            onClick={() => props.handleFontFamily("serif")}
            value="Serif"
            className="hover:text-purple-primary  font-serif capitalize"
          >
            Serif
          </li>
          <li
            onClick={() => props.handleFontFamily("monospace")}
            value="Mono"
            className="hover:text-purple-primary font-mono capitalize"
          >
            Monospace
          </li>
        </ol>
      </div>
    );
  }

  // the light and dark mode toggle switch
  function LightDarkToggle() {
    return (
      <div className="flex gap-2">
        <input aria-label="Dark Mode toggle" type="checkbox" className="toggle dark:bg-purple-primary"
        checked={props.darkModeTheme}
        onChange={handleInputChange} />
        {/* <img className="relative bottom-1" src={Moon} /> */}

      <Moon className="stroke-grey-primary fill-none dark:stroke-purple-primary" /> 
      </div>
    );
  }

  // Fonts - will control drop downs
  function Font() {
    return (
      <div className="flex justify-around gap-4">
        <div className="w-32 flex flex-col">
          <div className="flex self-end gap-2">
            <p className="capitalize dark:text-white">{props.isFontFamily}</p>
            <button aria-label="Font DropDown" onClick={() => setOpen(!isOpen)}>
              <DownArrow aria-hidden="true" className="h-4 w-4 fill-purple-primary" />
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
    <div className="flex justify-between py-6 px-6 md:px-10 lg:px-80 dark:bg-black-primary ">
      <img aria-label="Logo" src={Logo} className="h-8 w-8"  />
      <Font />
    </div>
  );
}
