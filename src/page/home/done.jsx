import React, { useRef, useEffect, useState, useCallback } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Select from "react-select";
import { city } from "../../data";
export default function Done() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 52.67895, lat: 36.55132 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "iJSDRH4hvq23Ye9Ae39p";
  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });
  }, [tokyo.lng, tokyo.lat, zoom]);

  const [data, setData] = useState();
  const [data2, setData2] = useState();


  const options = [
    { value: "1", label: "آذربایجان شرقی" },
    { value: "2", label: "آذربایجان غربی" },
    { value: "3", label: "اردبیل" },
    { value: "4", label: "اصفهان" },
    { value: "5", label: "البرز" },
    { value: "6", label: "ایلام" },
    { value: "7", label: "بوشهر" },
    { value: "8", label: "تهران" },
    { value: "9", label: "چهارمحال و بختیاری" },
    { value: "10", label: "خراسان جنوبی" },
    { value: "11", label: "خراسان رضوی" },
    { value: "12", label: "خراسان شمالی" },
    { value: "13", label: "خوزستان" },
    { value: "14", label: "زنجان" },
    { value: "15", label: "سمنان" },
    { value: "16", label: "سیستان و بلوچستان" },
    { value: "17", label: "فارس" },
    { value: "18", label: "قزوین" },
    { value: "19", label: "قم" },
    { value: "20", label: "کردستان" },
    { value: "21", label: "کرمان" },
    { value: "22", label: "کرمانشاه" },
    { value: "23", label: "کهگیلویه و بویراحمد" },
    { value: "24", label: "گلستان" },
    { value: "25", label: "گیلان" },
    { value: "26", label: "لرستان" },
    { value: "27", label: "مازندران" },
    { value: "28", label: "مرکزی" },
    { value: "29", label: "هرمزگان" },
    { value: "30", label: "همدان" },
    { value: "31", label: "یزد" },
  ];
  const cities = city.map((c, index) => {
    return { value: index, label: c.name };
  });
  console.log(cities[0]);
  const [isValid, setIsValid] = useState(false);
  const [isValid2, setIsValid2] = useState(false);


  useEffect(() => {
    setIsValid(data ? true : false);
  }, [data]);

  const FormSubmit = (e) => {
   
  };
  useEffect(() => {
    setIsValid2(data2 ? true : false);
  }, [data2]);

  const FormSubmit2 = (e) => {
    
  };

  return (
    <>
      <div>
        <form className="locations" onSubmit={FormSubmit}>
          <div className="locationsselect">
            <div>
              <Select
                className="location"
                options={options}
                onChange={(e) => setData(e.value)}
                value={options.filter(function (option) {
                  return option.value === data;
                })}
                label="Select option"
                placeholder={"استان ها"}
                menuPlacement="top"
                required
              />
              {!isValid && <p>لطفا استان خود را انتخاب کنید</p>}
            </div>
            <div>
              <Select
                className="location"
                options={cities}
                onChange={(e) => setData2(e.value)}
                value={cities.filter(function (option) {
                  return option.value === data2;
                })}
                label="Select option"
                placeholder={"شهر ها"}
                menuPlacement="top"
                required
              />
              {!isValid && <p>لطفا شهر خود را انتخاب کنید</p>}
            </div>
          </div>

          <button className="submitbtn" disabled={!isValid}>
            ثبت نهایی خرید
          </button>
        </form>
      </div>
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </>
  );
}
