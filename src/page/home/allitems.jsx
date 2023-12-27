import React, { useEffect, useState } from "react";
import Select from "react-select";
import Card from "../../components/offcard";
export default function Kala() {
  const [content, setContent] = useState(null);
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
      product.id.toString().toLowerCase().includes(search) ||
      product.price.toString().toLowerCase().includes(search) ||
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    ) {
      return product;
    }
  });
  return (
    <>
      <div className="parent">
        <div>
          <div className="serchbar">
            <div className="allitemsnav">
              <Select
                className="select"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder={"دسته بندی ها"}
              />
            </div>
            <div class="searchBar">
              <input
                className="input"
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
              />
              <button className="button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="pedar">
          {filteredProducts?.map((data, index) => {
            console.log(selectedOption);
            if (selectedOption == "all" || selectedOption.value == "all") {
              return (
                <>
                  <Card
                    id={data.id}
                    img={data.image}
                    title={data.category}
                    price={data.price}
                  />
                </>
              );
            }
            
            if (data.category == selectedOption.value) {
              return (
                <>
                  <Card
                    id={data.id}
                    img={data.image}
                    title={data.category}
                    price={data.price}
                  />
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
