import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="page-footer font-small blue pt-4 bg-dark">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">آنلاین شاپ</h5>
          <i className="fa-solid fa-shop fa-2xl"></i>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">لینک های سایت</h5>
          <ul className="list-unstyled">
            <li>
              <a className="footerlink" href="#banner">
                نوبار
              </a>
            </li>
            <li>
              <a className="footerlink" href="#itemslider">
                کالاها
              </a>
            </li>
            <li>
              <a className="footerlink" href="#off">
                تخفیف ها
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">صفحات دیگر</h5>
          <ul className="list-unstyled">
            <li>
              <Link className="footerlink" to="/list">
                همه کالا ها
              </Link>
            </li>
            <li>
              <Link className="footerlink" to="/shop">
                کالا های خریداری شده
              </Link>
            </li>
            <li>
              <Link className="footerlink" to="/done">
                اتمام خرید
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">
      <p href="https://mdbootstrap.com/"> طراحی شده در سال: 2023 </p>
    </div>
  </footer>
);

export default Footer;
