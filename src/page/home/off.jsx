import react, { useState, useEffect, useRef } from "react";

import Card from "../../components/offcard";

export default function Off() {
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
  const recordperPage = 3;
  const lastindex = recordperPage * currentPage;
  const firstindex = lastindex - recordperPage;
  const records = items?.slice(firstindex, lastindex);
  const npage = Math.ceil(items.length / recordperPage);
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

  const listitem = records?.map((slide, index) => {
    const newprice = (slide.price * 60) / 100;
    return (
      <div key={index}>
        <Card
          id={slide.id}
          img={slide?.image}
          title={slide?.category}
          price={slide?.price}
          newprice={newprice}
        />
      </div>
    );
  });

  return (
    <>
      <div
        className="offparent"
        id="off"
        ref={currentPageRef}
        onAnimationEnd={() => {
          if (currentPageRef.current) {
            currentPageRef.current.style.animation = "";
          }
        }}
      >
        <div className="topoffpage"><h3>تخفیفات ویژه</h3></div>
        <div className="itemslist">{listitem}</div>
        <div className="offpagebtns">
          <button className="offpagelbtn" onClick={prepage}>
            <i className="fa fa-angle-left"></i>
          </button>
          <button className="offpagerbtn" onClick={nextpage}>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
