import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";

function BasicExample({ id, img, title, price, newprice }) {
  const dispatch = useDispatch();
  let [isthere, setisthere] = useState("");
  let [data, setdata] = useState(store.getState());
  useEffect(() => {
    setisthere(false);
    data.auth.shopitems.map((item) => {
      if (item.id === id) {
        return setisthere(true);
      }
    });
  });
  
  function increase() {
    let countArry = JSON.parse(localStorage.getItem("labelCount"));
    setisthere(false);
    data.auth.shopitems.map((item) => {
      if (item.id === id) {
        return setisthere(true);
      }
    });
    countArry.push(id.toString());
    localStorage.setItem("labelCount", JSON.stringify(countArry));

    if (!isthere) {
      dispatch({
        type: "add",
        payload: { id: id, image: img, price: price, title: title },
      });
      setisthere(true);
      setdata(store.getState());
      toast("با موفقیت به سبد خرید اضافه شد", {
        duration: 1000,
        position: "top-center",
        style: { background: "rgb(48, 155, 21)", color: "white" },
        className: "",
        iconTheme: {
          primary: "rgb(48, 155, 21)",
          secondary: "#fff",
        },

        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  }
  return (
    <>
      <div className="col-sm-3">
        <div className="thumb-wrapper">
          <span className="wish-icon">
            <i className="fa fa-heart-o"></i>
          </span>
          <div className="img-box">
            <img src={img} className="img-fluid" alt="Headphone" />
          </div>
          <div className="thumb-content">
            <h4>{title}</h4>
            <p className="item-price">
              <p>${newprice}</p>
              <b>${price}</b>
            </p>
            <a onClick={increase} id="buybtn" className="btn btn-primary">
              افزودن به سبد خرید
            </a>
          </div>
        </div>
      </div>
    </>
  );
}


export default BasicExample;
