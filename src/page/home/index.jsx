import React from "react";
import Banner from "./banner";
import Items from "./items_slider";
import Off from "./off"
import Footer from "./footer"
export default function home() {
  return (
    <div>
      <Banner />
      <Items />
      <Off />
      <Footer />
    </div>
  );
}
