import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";
import { useCart } from "react-use-cart";

function NavbarIndex({ Admin }) {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();
  const [num, setnum] = useState(store.getState().auth.shopitems.length);
  useEffect(() => {
    setnum(store.getState().auth.shopitems.length);
  }, [store.getState().auth.shopitems.length]);

  const { isEmpty, totalItems } = useCart();

  return (
    <>
      {admin && (
        <>
          <nav dir="rtl" class="navbar navbar-expand-sm bg-dark navbar-dark">
            <div class="container-fluid">
              <ul class="navbar-nav">
                <Link to="/" className="routlink nav-link">
                  <div className="routlinktext" href="#action1">
                    <i className="fa-solid fa-house"></i> خانه
                  </div>
                </Link>
                <Link to="/list" className="routlink nav-link">
                  <div className="routlinktext" href="#action2">
                    <i className="fa-solid fa-shop"></i> همه کالاها
                  </div>
                </Link>
                <Link to="/done" className="routlink nav-link">
                  <div className="routlinktext" href="#action2">
                    <i className="fa-solid fa-bag-shopping"></i> تکمیل خرید
                  </div>
                </Link>
                <div className="navleft">
                  <Link to="/shop" className="routlink nav-link nav-shop nav-left">
                    <div>
                      <i className="fa-solid fa-cart-shopping">
                        {store.getState().auth.shopitems.length != 0 && (
                          <div className="numberofitems">
                            <p>{totalItems}</p>
                          </div>
                        )}
                      </i>
                    </div>
                  </Link>
                  <Link to="/" className="routlink nav-left">
                    <div
                      className="routlinktextdelete btn"
                      href="#action3"
                      onClick={() => {
                        dispatch({
                          type: "logout",
                        });
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                  </Link>
                </div>
              </ul>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default NavbarIndex;
