import react, { Suspense, useState, useEffect } from "react";
import Navbar from "./layout/navbar";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/notFound";
import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import Error from "./components/errorBoundary";
import Spinner from "./components/spinner";
import "./assets/Fonts/fontawesome-free-6.4.0-web/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/nav.css";
import "./assets/css/form.css";
import "./assets/css/home.css";
import "./assets/css/shop.css";
import "./assets/css/notfound.css";
import "./assets/css/card.css";
import "./assets/css/font.css";
import "./assets/css/errorpage.css";
import "./assets/Fonts/A-Iranian-Sans/iraniansans.ttf";
import "./assets/Fonts/Vazir-Bold.ttf";
import "./assets/Fonts/Vazir-Black-FD.ttf";
import "./App.css";


const Login = react.lazy(() => import("./page/login/index"));
const Sign = react.lazy(() => import("./page/signin/index"));
const Home = react.lazy(() => import("./page/home/index"));
const Shop = react.lazy(() => import("./page/home/shop"));
const Done = react.lazy(() => import("./page/home/done"));
const List = react.lazy(() => import("./page/home/allitems"));

function App() {
  const admin = useSelector((state) => state.auth.admin);
  localStorage.setItem("labelCount", JSON.stringify([]));
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 300);
  }, []);
  return (
    <>
      {spinner && <Spinner />}

      {!spinner && (
        <>
          <Toaster />
          <Error>
            <Suspense>
              {admin && (
                <>
                  <Navbar Admin={admin} />
                  <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/done" element={<Done />} />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </>
              )}
              {!admin && (
                <>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign" element={<Sign />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </>
              )}
            </Suspense>
          </Error>
        </>
      )}
    </>
  );
}

export default App;
