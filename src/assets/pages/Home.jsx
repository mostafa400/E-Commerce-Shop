import React, { useContext } from "react";

import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Discount from "../components/Discount";
import Arrivals from "../components/Arrivals";
import BestSales from "../components/BestSales";
import { ToastContainer } from "react-toastify";
import { Atom } from "react-loading-indicators";
import { DataContext } from "./DataContext";

function Home() {
  const { loading } = useContext(DataContext);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <Atom color="#000300" size="medium" text="" textColor="" />
      </div>
    );
  return (
    <div>
      <ToastContainer limit={3} />
      <Carousel />
      <Cards />
      <Discount />
      <Arrivals />
      <BestSales />
    </div>
  );
}

export default Home;
