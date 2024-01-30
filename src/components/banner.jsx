import React, { useState, useEffect, useRef } from "react";
import { store } from "../redux/store";
export default function UserIndex() {
  const [userdata, setuserdata] = useState(store.getState());
  const [spinner, setSpinner] = useState(true);
  let slider = [
    {
      class: "shopinfo",
      title: "فروشگاه آنلاین",
      info: "رضایت شما وظیفه ماست",
    },
    {
      class: "yalda",
      title: "تخفیفات ویژه شب یلدا",
      info: "به مناسبت شب یلدا تخفیف ویژه 40% مارو از دست ندین",
    },
  ];

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);
  let currentPageRef = useRef(null);
  const [currentPage, setcurrentPage] = useState(2);
  const recordperPage = 1;
  const lastindex = recordperPage * currentPage;
  const firstindex = lastindex - recordperPage;
  const records = slider?.slice(firstindex, lastindex);
  const npage = 1;

  const listitem = records.map((slide, index) => {
    return (
      <div className={slide.class} key={index}>
        <h1>{slide?.title}</h1>
        <p>{slide?.info}</p>
      </div>
    );
  });

  function prepage() {
    if (currentPage !== 1) {
      currentPageRef.current.style.animation = "prevPage .5s forwards";
      setcurrentPage(currentPage - 1);
    }
  }
  function nextpage() {
    if (currentPage !== 2) {
      currentPageRef.current.style.animation = "nextPage .5s forwards";
      setcurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <div
        className="banner"
        id="banner"
        ref={currentPageRef}
        onAnimationEnd={() => {
          if (currentPageRef.current) {
            currentPageRef.current.style.animation = "";
          }
        }}
      >
        {listitem}
      </div>

      <div>
        {currentPage !== 1 && (
          <button className="page-item1" onClick={prepage}>
            <a href="#" className="page-link">
              <i className="fa-solid fa-arrow-left"></i>
            </a>
          </button>
        )}
        {currentPage !== 2 && (
          <button className="page-item2" onClick={nextpage}>
            <a href="#" className="page-link">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </button>
        )}
      </div>
    </>
  );
}
