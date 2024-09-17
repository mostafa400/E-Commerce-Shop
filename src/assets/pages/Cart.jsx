import React, { useContext } from "react";
import { DataContext } from "../pages/DataContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    addToCart,
    removeProduct,
    cartTotal,
    itemTotal,
  } = useContext(DataContext);

  return (
    <div className="mt-10 p-5 bg-slate-200 flex  ">
      <div className="grid gap-5 lg:w-1/2 lg:mt-10 lg:ml-24 md:w-1/2 ml-5 mt-10">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              className=" rounded-lg bg-white shadow-md p-4 relative"
            >
              <div className="flex lg:flex-row gap-4 items-center flex-col ">
                <img
                  className="lg:w-64 md:w-52 sm:w-40 w-36 object-cover "
                  src={item.thumbnail}
                ></img>
                <div className="flex flex-col justify-center lg:gap-5 lg:m-5  ">
                  <h3 className="lg:text-xl font-bold text-base ">
                    {item.title}
                  </h3>
                  <p className="lg:text-xl">Quantity: {item.quantity}</p>
                  <p className="lg:text-xl mb-5 ">
                    Price: ${item.price}{" "}
                    {item.quantity > 1 && (
                      <>
                        * {item.quantity} = ${itemTotal(item).toFixed(2)}
                      </>
                    )}
                  </p>
                </div>

                <button
                  className="lg:w-12 lg:h-12 w-8 h-8  bg-white shadow-md text-black text-2xl hover:bg-[rgb(38,64,87)] hover:text-white transition duration-300 ease-in-out  flex items-center justify-center absolute top-2 right-2"
                  onClick={() => removeProduct(item)}
                >
                  x
                </button>
                <button
                  className="lg:w-12 lg:h-12 w-8 h-8  bg-white shadow-md text-black text-2xl hover:bg-[rgb(38,64,87)] hover:text-white transition duration-300 ease-in-out  flex items-center justify-center absolute bottom-2 right-2 "
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <button
                  className="lg:w-12 lg:h-12 w-8 h-8   bg-white shadow-md text-black text-2xl hover:bg-[rgb(38,64,87)] hover:text-white transition duration-300 ease-in-out  flex items-center justify-center absolute bottom-2 lg:right-20 right-14"
                  onClick={() => removeFromCart(item)}
                >
                  -
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="  rounded-lg bg-white shadow-md m-5 w-full  p-10">
            <h1 className="text-3xl">Your Cart is Empty.</h1>
          </div>
        )}
      </div>
      <div className="p-5 bg-white flex flex-col lg:ml-10 lg:mt-14  lg:h-48 lg:w-96  md:ml-5 md:mt-10 md:w-80 md:h-40 w-72 h-40 ml-5 mt-10">
        <h1 className="lg:text-2xl md:text-xl capitalize italic font-bold">
          Cart Summary{" "}
        </h1>
        <hr className="h-0.5 mt-5 bg-gray-300 border-0 "></hr>
        <p className="text-xl mt-2"> Total Price :</p>
        <span className="text-xl mt-2"> ${cartTotal().toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Cart;
