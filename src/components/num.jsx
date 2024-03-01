import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Num({
  title,
  pic,
  category,
  price,
  id,
  number,
}) {
  const [num, setnum] = useState(number);
  const dispatch = useDispatch();
  
  return (
    <div className="shopnumber">
      <button
        className="additionbtn h6 text-light"
        onClick={() => {
          setnum(num + 1);
          dispatch({
            type: "plus",
            payload: {
              title: title,
              price: price,
              category: category,
              image: pic,
              fid: id,
              num: num,
            },
          });
        }}
      >
        +
      </button>
      <p>{num}</p>
      <button
        className="abatementbtn h6 text-light"
        onClick={() => {
          if (num != 1) {
            setnum(num - 1);
            dispatch({
              type: "min",
              payload: {
                title: title,
                price: price,
                category: category,
                image: pic,
                fid: id,
                num: num,
              },
            });
          }
        }}
      >
        -
      </button>
    </div>
  );
}
