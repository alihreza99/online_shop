import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner";
import Form from "react-bootstrap/Form";
import Toast from "../../components/toast";

const schema = yup.object().shape({
  firstname: yup.string().required("لطفا نام خود را وارد کنید"),
  pass: yup
    .string()
    .required("لطفا رمز خود را وارد کنید")
    .min(4, "رمز شما باید حداقل دارای 4 عدد باشد"),
});

const Login = () => {
  const dispatch = useDispatch();
  const recaptcha = useRef();
  const [istoast, settoast] = useState(false);
  const [istoast2, settoast2] = useState(false);
  const [istoast3, settoast3] = useState(false);

  const users = useSelector((state) => state.auth.entities);
  let [viewModelstate, setviewModelstate] = useState({
    username: "",
    pass: "",
  });
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 300);
  }, []);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      settoast3(true);
      setTimeout(() => settoast3(false), 1500);
    } else {
      const payload = users.find(
        (user) =>
          user.username === viewModelstate.username &&
          user.pass == viewModelstate.pass
      );
      if (payload?.username == viewModelstate.username) {
        dispatch({
          type: "log",
          payload: payload,
        });
        settoast(true);
        setTimeout(() => settoast(false), 1500);
      } else {
        settoast2(true);
        setTimeout(() => settoast2(false), 1500);
      }
      window.grecaptcha.reset();
      reset();
    }
  };
  return (
    <>
      {istoast && <Toast text="با موفقیت وارد شدید" />}
      {istoast2 && <Toast text="اکانتی با این اسم و رمز وجود ندارد" />}
      {istoast3 && <Toast text="لظفا روی گزینه من ربات نیستم بزنید" />}

      {spinner && <Spinner />}
      {!spinner && (
        <div className="login-box">
          <p>ورود</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label className="formlable">
              نام کاربری<sup className="errortext">*</sup>
            </Form.Label>
            <div className="user-box">
              <Form.Control
                className="input"
                {...register("firstname")}
                type="text"
                onChange={handleChangename}
                autocomplete="off"
              />

              <p className="errortext">{errors.firstname?.message}</p>
            </div>
            <Form.Label className="formlable">
              {" "}
              رمز ورود<sup className="errortext">*</sup>
            </Form.Label>
            <div className="user-box">
              <Form.Control
                {...register("pass")}
                type="password"
                onChange={handleChangepass}
              />

              <p className="errortext">{errors.pass?.message}</p>
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
            میخواهید اکانت بسازید ؟{" "}
            <Link to="/sign" className="linktosigntext">
              ثبت نام
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

export default Login;
