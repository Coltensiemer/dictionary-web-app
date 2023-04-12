import React from "react";
import Logo from "../assets/images/logo.svg";
import Moon from "../assets/images/icon-moon.svg";
import DownArrow from "../assets/images/icon-arrow-down.svg";

// the light and dark mode toggle switch
export function LightDarkToggle() {
  return (
    <div className="flex gap-2">
      <input type="checkbox" className="toggle"  />
      <img className="relative bottom-1" src={Moon} />
    </div>
  );
}

// Fonts - will control drop downs
export function Font() {
  return (
    <div className="flex justify-around gap-4">
      <p>Serif</p>
      <img src={DownArrow} className="h-2 relative top-2" />
      <div className="text-grey-medium">|</div>
      <LightDarkToggle />
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="flex justify-between my-6">
      <img className="h-8 w-8" src={Logo} />
      <Font />
    </div>
  );
}
