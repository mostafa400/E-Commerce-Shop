import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./assets/components/Layout";
import Home from "./assets/pages/Home";
import Shop from "./assets/pages/Shop";
import Cart from "./assets/pages/Cart";
import Login from "./assets/pages/Login";
import SignUp from "./assets/pages/SignUp";
import NotFound from "./assets/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
