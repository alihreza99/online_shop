import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { store } from "../redux/store";
import { useDispatch } from "react-redux";
import Num from "./num";
import toast from "react-hot-toast";

export default function Shop() {
  const [content, setContent] = useState(null);
  const [listShop, setListShop] = useState(
    JSON.parse(localStorage.getItem("labelCount"))
  );
  let [data, setdata] = useState(store.getState());
  const [show, setShow] = useState(false);
  const [itemtitle, setItemtitle] = useState("");
  const dispatch = useDispatch();

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
      setTimeout(() => {
        dispatch({
          type: "deleteitem",
          payload: itemtitle,
        });
        setdata(store.getState());
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
          <h1 className="emptypage">هیچ ایتمی خریداری نشده!!</h1>
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
                  <b>{data.title}</b>
                </span>
                <br />
                <span className="category">{data.category}</span>
                <br />
                <span className="price">قیمت = ${data.price}</span>
                <br />
                <div className="btns">
                  <button
                    className="deletebtn"
                    onClick={() => {
                      handleShow(data.id);
                    }}
                  >
                    حذف
                  </button>
                </div>
                <Num />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

