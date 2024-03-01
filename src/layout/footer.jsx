import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <div className="footer">
      <footer class="bg-dark py-3 ">
        <ul class="nav bg-dark  justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <Link className="nav-link px-4 text-light" to="/list">
              همه کالا ها{" "}
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link px-4 text-light" to="/shop">
              کالا های خریداری شده{" "}
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link px-4 text-light" to="/done">
              اتمام خرید{" "}
            </Link>
          </li>
          <li class="nav-item">
            <a className="nav-link px-4 text-light" href="#banner">
              نوبار
            </a>
          </li>
        </ul>
        <p class="text-center text-light">© 2023 طراحی شده در سال</p>
      </footer>
    </div>
  </>
);

export default Footer;
