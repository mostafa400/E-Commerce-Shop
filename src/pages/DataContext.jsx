import React, { createContext, useState, useEffect, useMemo } from "react";
import { Atom } from "react-loading-indicators";
import { useLocalStorage } from "../UseLocalStorage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

// control the toast notifaction
const handleToast = (type, message) => {
  const toastOptions = {
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };

  if (type === "success") {
    toast.success(message, toastOptions);
  } else if (type === "error") {
    toast.error(message, toastOptions);
  }
};

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [storedEmail] = useLocalStorage("email", "");
  const [storedPassword] = useLocalStorage("password", "");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // to fetch the data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=30`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // to store cart data in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // to fetch cart data from api
  const fetchCart = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/carts`);
      const cartData = await response.json();

      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError(error.message);
    }
  };
  // sending a request for the dummy api to add items
  const addItemToCart = async (item) => {
    try {
      const response = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const newItem = await response.json();
      setCart((prevCart) => [...prevCart, newItem]);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError(error.message);
    }
  };
  // allowing the user to add to the cart only if he is logged in
  const addToCart = (newItem) => {
    if (storedEmail && storedPassword) {
      const existingItem = cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...newItem, quantity: 1 }]);
      }
      handleToast("success", `${newItem.title} added to cart!`);
    } else {
      handleToast(
        "error",
        "Please log in to add items to cart. Redirecting..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  // allowing the user to remove an item from the cart only if he is logged in
  const removeFromCart = (newItem) => {
    if (storedEmail && storedPassword) {
      const existingItem = cart.find((item) => item.id === newItem.id);

      if (existingItem.quantity === 1) {
        setCart(cart.filter((item) => item.id !== newItem.id));
      } else {
        setCart(
          cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    } else {
      handleToast(
        "error",
        "Please log in to remove items from cart , Redirecting..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  // allowing the user to remove the product the cart only if he is logged in
  const removeProduct = (newItem) => {
    if (storedEmail && storedPassword) {
      setCart(cart.filter((item) => item.id !== newItem.id));
    } else {
      handleToast(
        "error",
        "Please log in to remove products from cart, Redirecting..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  // to calculate the total price of the cart
  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // to calculate the total price of the item
  const itemTotal = (item) => {
    return item.price * item.quantity;
  };
  // to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  const contextValue = useMemo(
    () => ({
      ...data,
      cart,
      fetchCart,
      addItemToCart,
      loading,
      error,
      addToCart,
      removeFromCart,
      cartTotal,
      clearCart,
      removeProduct,
      itemTotal,
      handleToast,
    }),
    [data, cart, loading, error]
  );

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <Atom color="#000300" size="medium" text="" textColor="" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <DataContext.Provider value={contextValue}>
      <ToastContainer limit={3} />
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
