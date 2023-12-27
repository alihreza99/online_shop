import React, { useState } from "react";

export default function Num() {
  const [num, setnum] = useState(1);

  return (
    <div className="shopnumber">
      <button
        className="abatementbtn"
        onClick={() => {
          if (num != 1) {
            setnum(num - 1);
          }
        }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <p>{num}</p>
      <button
        className="additionbtn"
        onClick={() => {
          setnum(num + 1);
        }}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
