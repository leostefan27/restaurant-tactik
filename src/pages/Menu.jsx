import React from "react";
import { useLayoutEffect } from "react";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import MenuComponent from "../components/MenuComponent/MenuComponent";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";

const Menu = () => {
  return (
    <>
      <NavbarComponent />
      <MenuComponent />
      <FooterComponent />
    </>
  );
};

export default Menu;
