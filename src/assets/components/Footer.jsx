import React from "react";

function Footer() {
  return (
    <footer className="bg-sky-950 text-white">
      <div className="grid md:grid-cols-4 p-20 gap-3 ">
        <div className="flex flex-col md:w-3/4 w-4/5">
          <h1>Shop</h1>
          <p className="opacity-50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
            libero id et, in gravida. et.
          </p>
        </div>
        <div>
          <h1>About us</h1>
          <p className="opacity-50">Carres</p>
          <p className="opacity-50">Our Stores</p>
          <p className="opacity-50">Our Carres</p>
          <p className="opacity-50">Terms & Conditions</p>
          <p className="opacity-50">Privacy policy</p>
        </div>
        <div>
          <h1>Customer Care</h1>
          <p className="opacity-50">Help Center </p>
          <p className="opacity-50">How to buy</p>
          <p className="opacity-50">Track your order</p>
          <p className="opacity-50">corospondence</p>
          <p className="opacity-50">Return and refund</p>
        </div>
        <div>
          <h1>Contact US</h1>
          <p className="opacity-50">
            {" "}
            831 Gulf Breeze Pkwy Gulf Breeze Florida 32561
          </p>
          <p className="opacity-50">Hhadsua@fasfsaf</p>
          <p className="opacity-50">phone (850) 932-5012</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
