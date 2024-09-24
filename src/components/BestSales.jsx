import React, { useContext } from "react";
import { Link } from "react-router-dom";

import StarRating from "./StarRating";
import { DataContext } from "../pages/DataContext";

function BestSales() {
  const Data = useContext(DataContext);
  const { addToCart } = useContext(DataContext);
  const beauty = Data.products
    .filter((item) => item.category === "beauty")
    .slice(0, 3);
  const fragrances = Data.products
    .filter((item) => item.category === "fragrances")
    .slice(1, 3);
  const furniture = Data.products
    .filter((items) => items.category === "furniture")
    .slice(0, 4);

  const filteredProducts = [...fragrances, ...furniture, ...beauty];

  return (
    <div className="flex flex-col justify-center items-center relative bg-slate-100 ">
      <h1 className="text-3xl my-10">Best Sales</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-5">
        {filteredProducts.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded border-2 shadow-md bg-white  relative"
          >
            <Link to={`/products/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full p-5 border-5 rounded shadow-md  "
              />
            </Link>
            <p className="text-xl px-3 ">{item.title}</p>

            <StarRating />

            <span className="text-xl px-3 my-3">${item.price}</span>
            <button
              onClick={() => {
                addToCart({
                  id: item.id,
                  quantity: 1,
                  title: item.title,
                  thumbnail: item.thumbnail,
                  price: item.price,
                });
              }}
              className="w-12 h-12 rounded-full bg-white shadow-md text-black text-2xl hover:bg-[rgb(38,64,87)] hover:text-white transition duration-300 ease-in-out absolute bottom-2 right-2 flex items-center justify-center"
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSales;
