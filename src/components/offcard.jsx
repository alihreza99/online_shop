import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";
import { useCart } from "react-use-cart";
import Num from "../components/num";
export default function BasicExample({
  id,
  img,
  category,
  title,
  price,
  newprice,
  num,
}) {
  const dispatch = useDispatch();
  let [isthere, setisthere] = useState(false);
  let [n, setnum] = useState(false);

  let [data, setdata] = useState(store.getState());
  const { addItem } = useCart();

  useEffect(() => {
    setisthere(false);
    data.auth.shopitems.map((item) => {
      if (item?.id === id) {
        setnum(item?.number);
        return setisthere(true);
      }
    });
  });
  function increase() {
    let countArry = JSON.parse(localStorage.getItem("labelCount"));
    data.auth.shopitems.map((item) => {
      if (item?.id === id) {
        return setisthere(true);
      }
    });
    countArry.push(id?.toString());
    localStorage.setItem("labelCount", JSON.stringify(countArry));

    if (!isthere) {
      if (newprice) {
        addItem({ id: id, image: img, price: price, title: title, number: 1 });

        dispatch({
          type: "add",
          payload: {
            id: id,
            image: img,
            price: newprice,
            title: title,
            number: 1,
          },
        });
      }
      if (!newprice) {
        addItem({ id: id, image: img, price: price, title: title, number: 1 });

        dispatch({
          type: "add",
          payload: {
            id: id,
            image: img,
            price: price,
            title: title,
            number: 1,
          },
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
    <Card className="offcard">
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
        {isthere && (
          <>
            {n && (
              <Num
                title={title}
                category={category}
                pic={img}
                price={price}
                id={id}
                number={n}
              />
            )}
            {!n && (
              <Num
                title={title}
                category={category}
                pic={img}
                price={price}
                id={id}
                number={1}
              />
            )}
          </>
        )}
        {!isthere && (
          <Button onClick={increase} variant="primary">
            افزودن به سبد خرید
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
