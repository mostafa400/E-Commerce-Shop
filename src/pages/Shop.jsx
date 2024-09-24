import React, { useState, useContext } from "react";
import { DataContext } from "../pages/DataContext";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Atom } from "react-loading-indicators";

function Shop() {
  const Data = useContext(DataContext);
  const { addToCart, loading } = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "beauty", "furniture", "fragrances", "groceries"];

  const filteredProducts = Data.products
    .filter((item) => {
      const categoryMatch =
        selectedCategory === "All" || item.category === selectedCategory;
      const searchMatch =
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    })
    .slice(0, 30);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <Atom color="#000300" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div>
      <div className="relative scroll-hidden ">
        <img
          className="h-60 w-full object-cover"
          src="../public/images/table.jpg"
          alt="shop"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Shop</h1>
        </div>
      </div>

      <div className="flex md:flex-row flex-col-reverse gap-5 justify-center items-center mt-10 space-x-4">
        <Menu as="div" className="relative">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#0f3460] px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#0f3460] focus:ring-4 focus:outline-none focus:ring-[#0f3460]">
              Products
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-white"
              />
            </MenuButton>
          </div>

          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <div className="py-1">
              {categories.map((category) => (
                <MenuItem key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Products..."
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center bg-slate-200">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
          {filteredProducts.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded border-2 shadow-md relative bg-white"
            >
              <Link to={`/products/${item.id}`}>
                <LazyLoadImage
                  effect="blur"
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full p-5 border-5 rounded shadow-md"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                />
              </Link>
              <p className="text-xl px-3">{item.title}</p>
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
    </div>
  );
}

export default Shop;
