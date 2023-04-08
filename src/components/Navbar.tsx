import React from "react";
import Logo from "../assets/images/logo.svg";
import Moon from "../assets/images/icon-moon.svg";
import DownArrow from "../assets/images/icon-arrow-down.svg";

// the light and dark mode toggle switch
export function LightDarkToggle() {


let checked: boolean = false; 

  return (
    <>
      <input type="checkbox" className="toggle "  />
      <img src={Moon} />
    </>
  );
}

// Fonts - will control drop downs
export function Font() {
  return (
    <div className="flex justify-around w-24">
      <p>Serif</p>
      <img src={DownArrow} className="h-2" />
      <LightDarkToggle />
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="flex justify-between my-6">
      <img src={Logo} />
      <Font />
      
    </div>
  );
}
