import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { store } from "../../../redux/store";
import { Link } from "react-router-dom";
import Spinner from "../../../components/spinner";
import Form from "react-bootstrap/Form";
import Toast from "../../../components/toast";

const schema = yup.object().shape({
  firstname: yup.string().required("لطفا نام خود را وارد کنید"),
  price: yup
    .number()
    .typeError("لطفا مبلغ  ورودی خود را وارد کنید")
    .required("لطفا مبلغ  ورودی خود را وارد کنید"),
  pass: yup
    .string()
    .required("لطفا رمز خود را وارد کنید")
    .min(4, "رمز شما باید حداقل دارای 4 عدد باشد"),
  email: yup
    .string()
    .email("متن وارد شده اشتباه است ")
    .required("لطفا ایمیل خود را وارد کنید"),
});

const Sign = () => {
  const dispatch = useDispatch();
  const recaptcha = useRef();
  const [istoast, settoast] = useState(false);
  const [istoast2, settoast2] = useState(false);

  let [data, setdata] = useState(
    store.getState().auth.entities[store.getState().auth.entities.length - 1].id
  );
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 300);
  }, []);
  let [viewModelstate, setviewModelstate] = useState({
    username: "",
    id: +data + 1,
    img: "./App/Pics/profilepic.jpg",
    status: "فعال",
    transaction: "",
    pass: "",
    email: "",
  });

  const handleChangename = (event) => {
    setviewModelstate({
      ...viewModelstate,
      username: event.target.value,
    });
  };
  const handleChangepass = (event) => {
    setviewModelstate({
      ...viewModelstate,
      pass: event.target.value,
    });
  };
  const handleChangeprice = (event) => {
    setviewModelstate({
      ...viewModelstate,
      transaction: event.target.value + "$",
    });
  };
  const handleChangeemail = (event) => {
    setviewModelstate({ ...viewModelstate, email: event.target.value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      settoast2(true);
      setTimeout(() => settoast2(false), 1500);
    } else {
      setviewModelstate({
        ...viewModelstate,
        id: viewModelstate.id + 1,
      });

      dispatch({
        type: "sign",
        payload: viewModelstate,
      });
      settoast(true);
      setTimeout(() => settoast(false), 1500);
      window.grecaptcha.reset();
      reset();
    }
  };

  return (
    <>
      {istoast && <Toast text="کاربر با موفقیت اضافه شد" />}
      {istoast2 && <Toast text="لظفا روی گزینه من ربات نیستم بزنید" />}

      {spinner && <Spinner />}
      {!spinner && (
        <div className="login-box login-box-sign">
          <p>ثبت نام</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label className="formlable">
              نام کاربری<sup className="errortext">*</sup>
            </Form.Label>
            <div className="user-box">
              <Form.Control
                {...register("firstname")}
                type="text"
                onChange={handleChangename}
                autocomplete="off"
              />
              <p className="errortext">{errors.firstname?.message}</p>
            </div>
            <Form.Label className="formlable">
              رمز ورود<sup className="errortext">*</sup>
            </Form.Label>
            <div className="user-box">
              <Form.Control
                {...register("pass")}
                type="password"
                onChange={handleChangepass}
                autocomplete="off"
              />
              <p className="errortext">{errors.pass?.message}</p>
            </div>
            <Form.Label className="formlable">
              مبلغ ورود<sup className="errortext">*</sup>
            </Form.Label>
            <div className="user-box">
              <Form.Control
                {...register("price")}
                type="number"
                onChange={handleChangeprice}
                autocomplete="off"
              />
              <p className="errortext">{errors.price?.message}</p>
            </div>
            <Form.Label className="formlable">
              ایمیل<sup className="errortext">*</sup>
            </Form.Label>
            <div className="user-box">
              <Form.Control
                {...register("email")}
                type="text"
                onChange={handleChangeemail}
                autocomplete="off"
              />
              <p className="errortext">{errors.email?.message}</p>
            </div>
            <button className="log-button" type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              ورود
            </button>
          </form>
          <p>
            اکانت دارید ؟{" "}
            <Link to="/" className="linktosigntext">
              ورود
            </Link>
            <div className="repacparent">
              <ReCAPTCHA
                ref={recaptcha}
                className="recap"
                hl="fa"
                sitekey="6Lf6KRQpAAAAAK0PHLUCqgyqHX_e8h2UsFMH7jyq"
              />
            </div>
          </p>
        </div>
      )}
    </>
  );
};

export default Sign;
