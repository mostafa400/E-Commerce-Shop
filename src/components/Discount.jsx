import React, { useContext } from "react";
import { DataContext } from "../pages/DataContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StarRating from "./StarRating";

function Discount() {
  const Data = useContext(DataContext);
  const { addToCart } = useContext(DataContext);

  const notify = (item) =>
    toast(`${item.title} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const generateRandomDiscount = () => {
    const discounts = [10, 15, 20, 25, 30];
    return discounts[Math.floor(Math.random() * discounts.length)];
  };

  const beauty = Data.products
    .filter((item) => item.category === "beauty")
    .slice(0, 3);
  const fragrances = Data.products
    .filter((item) => item.category === "fragrances")
    .slice(1, 3);
  const furniture = Data.products
    .filter((items) => items.category === "furniture")
    .slice(0, 4);

  const filteredProducts = [...beauty, ...fragrances, ...furniture];

  return (
    <div className="flex flex-col justify-center items-center relative bg-slate-100 ">
      <h1 className="text-3xl my-10">Big Discounts</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-5">
        {filteredProducts.map((item, index) => {
          const discount = generateRandomDiscount();
          return (
            <div
              key={index}
              className="flex flex-col bg-white gap-2 rounded border-2 shadow-md relative"
            >
              <div
                className="absolute top-0 left-0 bg-blue-700 text-white text-xs font-bold rounded-full px-2 py-1"
                style={{ backgroundColor: "rgb(38, 64, 87)" }}
              >
                {discount}% OFF
              </div>

              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full p-5 border-5 rounded shadow-md "
              />
              <p className="text-xl px-3">{item.title}</p>

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
                  notify(item);
                }}
                className="w-12 h-12 rounded-full bg-white shadow-md text-black text-2xl hover:bg-[rgb(38,64,87)] hover:text-white transition duration-300 ease-in-out absolute bottom-2 right-2 flex items-center justify-center"
              >
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Discount;
