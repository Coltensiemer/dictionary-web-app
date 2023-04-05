import React from "react";
import Logo from "../assets/images/logo.svg";
import Moon from "../assets/images/icon-moon.svg";
import DownArrow from "../assets/images/icon-arrow-down.svg";

// the light and dark mode toggle switch
export function LightDarkToggle() {
  return (
    <>
      <input type="checkbox" className="toggle " checked />
      <img src={Moon} />
    </>
  );
}

// Fonts - will control drop downs
export function Font() {
  return (
    <div className="flex">
      <p>Serif</p>
      <img src={DownArrow} className="h-2" />
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="flex">
      <img src={Logo} />
      <Font />
      <LightDarkToggle />
    </div>
  );
}
