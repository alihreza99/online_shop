import React, { useEffect, useState } from "react";
import Select from "react-select";
import Card from "./offcard";
import Spinner from "../components/spinner";

export default function Kala() {
  const [content, setContent] = useState(null);
  const [category, setcategory] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [all, setall] = useState(true);

  const [listShop, setListShop] = useState(
    JSON.parse(localStorage.getItem("labelCount"))
  );

  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setContent(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const options = [
    { value: "all", label: "همه" },
    { value: "men's clothing", label: "لباس مردانه" },
    { value: "women's clothing", label: "لباس زنانه" },
    { value: "jewelery", label: "جواهرات" },
    { value: "electronics", label: "الکترونیک" },
  ];

  const [selectedOption, setSelectedOption] = useState("all");

  const filteredProducts = content?.filter((product) => {
    if (
      product?.id.toString().toLowerCase().includes(search) ||
      product?.price.toString().toLowerCase().includes(search) ||
      product?.title.toLowerCase().includes(search) ||
      product?.category.toLowerCase().includes(search)
    ) {
      return product;
    }
  });

  function onclickbtn(e) {
    console.log(selectedOption);
    setTimeout(() => setSpinner(true), 300);
    setall(false);
    if (e.value == "all") {
      setall(true);
    }
    fetch(`https://fakestoreapi.com/products/category/${e.value}`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => setSpinner(false), 600);

        setcategory(res);
        console.log(category);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="parent">
        <div>
          <div className="serchbar">
            <div className="allitemsnav">
              <Select
                className="select"
                defaultValue={selectedOption}
                onChange={onclickbtn}
                options={options}
                placeholder={"دسته بندی ها"}
              />
            </div>
            <div class="searchBar">
              <input
                className="form-control"
                name="search"
                placeholder={"نام کالارا سرچ کنید"}
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
              />
            </div>
          </div>
        </div>

        <div className="pedar">
          {all && (
            <>
              {content?.map((item) => {
                return (
                  <>
                    <div className="pedar_items">
                      <Card
                        id={item?.id}
                        img={item?.image}
                        title={item?.category}
                        price={item?.price}
                      />
                    </div>
                  </>
                );
              })}
            </>
          )}
          {spinner && (
            <>
              <div className="itemloading">
                {" "}
                <div>
                  <Spinner />
                </div>
              </div>
            </>
          )}
          {!spinner && (
            <>
              {category?.map((item) => {
                return (
                  <>
                    <div className="pedar_items">
                      <Card
                        id={item?.id}
                        img={item?.image}
                        title={item?.category}
                        price={item?.price}
                        num={item?.number}
                      />
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}







{/* <div className="pedar">
  {filteredProducts?.map((data, index) => {
    if (selectedOption == "all" || selectedOption.value == "all") {
      return (
        <>
          <div className="pedar_items">
            <Card
              id={data?.id}
              img={data?.image}
              title={data?.category}
              price={data?.price}
            />
          </div>
        </>
      );
    }

    if (data?.category == selectedOption.value) {
      return (
        <>
          <div className="pedar_items">
            <Card
              id={data?.id}
              img={data?.image}
              title={data?.category}
              price={data?.price}
            />
          </div>
        </>
      );
    }
  })}
</div>;*/}