import React from "react";
import {
  IoSwapHorizontal,
  IoShieldCheckmark,
  IoCall,
  IoCarSharp,
} from "react-icons/io5";

function Cards() {
  return (
    <div className="lg:flex md:grid sm:grid-cols-2 sm:justify-items-center grid justify-center my-10 gap-3 border-solid shadow-sm ">
      <div className="w-80 h-48 sm:w-72 sm:h-44 flex justify-center items-center bg-pink-100 ">
        <div className=" flex flex-col items-center text-center p-10 gap-2">
          <IoCarSharp className="text-2xl " />
          <p className="text-xl">Free Shipping</p>
          <p>Free shipping on all orders</p>
        </div>
      </div>
      <div className="w-80 h-48 sm:w-72 sm:h-44 flex justify-center items-center bg-teal-100 ">
        <div className=" flex flex-col items-center text-center p-10 gap-2">
          <IoSwapHorizontal className="text-2xl self-center" />
          <p className="text-xl">Easy Returns</p>
          <p>Hassle-free 30-day returns</p>
        </div>
      </div>
      <div className="w-80 h-48 sm:w-72 sm:h-44 flex justify-center items-center bg-lime-200 ">
        <div className="flex flex-col items-center text-center p-10 gap-2">
          <IoCall className="text-2xl self-center" />
          <p className="text-xl">24/7 Customer Support</p>
          <p>We are here anytime,</p>
        </div>
      </div>
      <div className="w-80 h-48 sm:w-72 sm:h-44 flex justify-center items-center bg-blue-100 ">
        <div className=" flex flex-col items-center text-center p-10 gap-2">
          <IoShieldCheckmark className="text-2xl self-center" />
          <p className="text-xl"> Secure Payments</p>
          <p>Safe and secure checkout</p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
