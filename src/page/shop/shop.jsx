import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { store } from "../../redux/store";
import { useDispatch } from "react-redux";
import Num from "./../../components/num";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

export default function Shop() {
  const [content, setContent] = useState(null);
  const { removeItem, items } = useCart();
  const [listShop, setListShop] = useState(
    JSON.parse(localStorage.getItem("labelCount"))
  );
  let [data, setdata] = useState(store.getState());
  const [show, setShow] = useState(false);
  const [itemtitle, setItemtitle] = useState("");
  const [kalas, setkalas] = useState(data.auth.prices);
  const dispatch = useDispatch();
  const { isEmpty, totalItems } = useCart();
  const [sum, setsum] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setContent(res);
        
      })
      .catch((err) => console.log(err));
  }, []);
  
  function deleteitem(e) {
    fetch(`https://fakestoreapi.com/products/${e}`, {
      method: "DELETE",
    }).then(() => {
      setShow(false);
      const timeoutID = setTimeout(() => {
        dispatch({
          type: "deleteitem",
          payload: itemtitle,
        });
        setdata(store.getState());
        console.log(items);
        console.log(itemtitle);
        removeItem(itemtitle);
        toast("با موفقیت حذف شد", {
          duration: 1000,
          position: "top-center",
          style: { background: "rgb(255,0,0)", color: "white" },
          className: "",
          iconTheme: {
            primary: "rgb(255,0,0)",
            secondary: "#fff",
          },

          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        const deleted = content.filter((f) => f.id !== itemtitle);
        setContent(deleted);
      }, 200);
    });
  }
  const handleClose = () => setShow(false);


  function handleShow(event) {
    setShow(true);
    setItemtitle(event);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-dark text-white">
          <Modal.Title>اخطار</Modal.Title>
        </Modal.Header>
        <Modal.Body>میخواهید این ایتم را حذف کنید؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            خیر
          </Button>
          <Button variant="primary" onClick={deleteitem}>
            بله
          </Button>
        </Modal.Footer>
      </Modal>

      {data.auth.shopitems.length == 0 && (
        <div className="emptyparent">
          <h1 className="emptypage">سبد خرید شما خالی است!!</h1>
        </div>
      )}
      <div className="shoppedar">
        {data.auth.shopitems.length != 0 && (
          <div className="shopminibox">
            <div className="shopminibox-text">
              <p className="text-light"> تعداد کالاها: </p>
              <p className="text-light"> {totalItems} </p>
            </div>
            <div className="shop-btn">
              <Link href="#nav" to="/done">
                <a className="btn btn-success">ثبت نهایی</a>
              </Link>
            </div>
          </div>
        )}

        <div className="pedar">
          {data.auth.shopitems.map((data, index) => {
            return (
              <>
                <div className="item-kharid" key={index}>
                  <img className="image" src={data?.image} alt="image" />
                  <br />
                  <span className="name">
                    <b>{data?.title}</b>
                  </span>
                  <br />
                  <span className="category">{data?.category}</span>
                  <br />
                  <span className="price">قیمت = ${data?.price}</span>
                  <br />
                  <div className="btns h6">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleShow(data?.id);
                      }}
                    >
                      حذف
                    </button>
                  </div>
                  <Num
                    title={data?.title}
                    category={data?.category}
                    pic={data?.image}
                    price={data?.price}
                    id={data?.id}
                    number={data?.number}
                    
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
