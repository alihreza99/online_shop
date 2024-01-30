import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";

function NavbarIndex({ Admin }) {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();
  const [num, setnum] = useState(store.getState().auth.shopitems.length);
  useEffect(() => {
    setnum(store.getState().auth.shopitems.length);
  }, [store.getState().auth.shopitems.length]);
  return (
    <>
      {admin && (
        <>
          <div className="nav">
            <Link to="/" className="routlink btn">
              <div className="routlinktext" href="#action1">
                خانه <i className="fa-solid fa-house"></i>
              </div>
            </Link>
            <Link to="/list" className="routlink btn">
              <div className="routlinktext" href="#action2">
                همه کالاها <i className="fa-solid fa-shop"></i>
              </div>
            </Link>
            <Link to="/done" className="routlink btn">
              <div className="routlinktext" href="#action2">
                تکمیل خرید <i className="fa-solid fa-bag-shopping"></i>
              </div>
            </Link>
            <Link to="/shop" className="routlink btn">
              <div>
                آیتم های خریداری شده
                <i className="fa-solid fa-cart-shopping">
                  {store.getState().auth.shopitems.length != 0 && (
                    <div className="numberofitems">
                      <p>{num}</p>
                    </div>
                  )}
                </i>
              </div>
            </Link>
            <Link to="/" className="routlink">
              <div
                className="routlinktextdelete btn"
                href="#action3"
                onClick={() => {
                  dispatch({
                    type: "logout",
                  });
                }}
              >
                خروج<i className="fa-solid fa-right-from-bracket"></i>
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default NavbarIndex;
