import React from "react";
import Banner from "../../components/banner";
import Items from "../../components/items_slider";
import Off from "../../components/off"
import Footer from "../../layout/footer"
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
