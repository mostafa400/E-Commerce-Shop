import { useParams } from "react-router-dom";
import React, { useContext } from "react";
import { DataContext } from "../pages/DataContext";

function ProductsDetails() {
  const { id } = useParams();
  const { products, addToCart } = useContext(DataContext);

  const product = products.find((item) => item.id === parseInt(id));

  return (
    <div>
      <div className="relative ">
        <img
          className="h-60 w-full object-cover"
          src="../public/images/table.jpg"
          alt={product.title}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-white md:text-4xl sm:text-3xl text-2xl font-bold text-center">
            {product.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex md:flex-row flex-col items-center gap-5 justify-center py-10">
          <div className="w-1/4">
            <img
              className="w-full object-cover"
              src={product.thumbnail}
              alt="product"
            />
          </div>
          <div className="flex flex-col  gap-5 md:w-1/2 w-3/4 text-left">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-6">
              {product.title}
            </h1>
            <span className="text-2xl"> Price: ${product.price}</span>
            <p className="text-xl md:w-3/4">{product.description} </p>
            <p className="text-xl ">
              Category: {product.category.toUpperCase()}
            </p>

            <button
              className="bg-slate-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-1/2 "
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
