import react, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Card from "../components/card";

export default () => {
  const [items, setitems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setitems(res);
      })
      .catch((err) => console.log(err));
  }, []);

  let currentPageRef = useRef(null);
  const [currentPage, setcurrentPage] = useState(1);
  const recordperPage = 4;
  const lastindex = recordperPage * currentPage;
  const firstindex = lastindex - recordperPage;
  const records = items?.slice(firstindex, lastindex);
  const npage = Math.ceil(items.length / recordperPage);
  const listitem = records.map((slide, index) => {
    return (
      <div key={index}>
        <Card id={slide?.id} img={slide?.image} title={slide?.category} price={slide?.price} />
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
    if (currentPage !== npage) {
      currentPageRef.current.style.animation = "nextPage .5s forwards";
      setcurrentPage(currentPage + 1);
    }
  }
  return (
    <>
      <div className="sliderbody">
        <h2>تمام آیتم ها </h2>
        <div
          className="sliderlist"
          ref={currentPageRef}
          onAnimationEnd={() => {
            if (currentPageRef.current) {
              currentPageRef.current.style.animation = "";
            }
          }}
        >
          {listitem}
        </div>
        <Link to="./list">
          <button className="toallitems btn btn-primary">تمام کالا ها</button>
        </Link>
        <a
          className="carousel-control-prev"
          href="#myCarousel"
          data-slide="prev"
          onClick={prepage}
        >
          <i className="fa fa-angle-left"></i>
        </a>
        <a
          className="carousel-control-next"
          href="#myCarousel"
          data-slide="next"
          onClick={nextpage}
        >
          <i className="fa fa-angle-right"></i>
        </a>
      </div>
    </>
  );
};

