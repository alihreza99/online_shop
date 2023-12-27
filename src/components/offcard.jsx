import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";
export default function BasicExample({id, img, title, price, newprice }) {
  const dispatch = useDispatch();
  let [isthere, setisthere] = useState(false);
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
    data.auth.shopitems.map((item) => {
      if (item.id === id) {
        return setisthere(true);
      }
    });
    countArry.push(id.toString());
    localStorage.setItem("labelCount", JSON.stringify(countArry));

    if (!isthere) {
      if(newprice){
        dispatch({
          type: "add",
          payload: { id: id, image: img, price: newprice, title: title },
        });
      }
      if (!newprice) {
        dispatch({
          type: "add",
          payload: { id: id, image: img, price: price, title: title },
        });
      }
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
    <Card className="offcard" >
      <Card.Img className="offcardimg" variant="top" src={img} />
      <Card.Body>
        <Card.Title className="offcardtext">{title}</Card.Title>
        <Card.Text>
          {newprice && (
            <>
              <p className="oldprice">${price}</p>{" "}
              <b className="offcardtext">${newprice}</b>
            </>
          )}
          {!newprice && (
            <>
              <p className="offcardtext">${price}</p>{" "}
            </>
          )}
        </Card.Text>
        <Button onClick={increase} variant="primary">
          افزودن به سبد خرید
        </Button>
      </Card.Body>
    </Card>
  );
}
