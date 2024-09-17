import React, { createContext, useState, useEffect, useMemo } from "react";
import { Atom } from "react-loading-indicators";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const addToCart = (newItem) => {
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
  };

  const removeFromCart = (newItem) => {
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
  };

  const removeProduct = (newItem) => {
    setCart(cart.filter((item) => item.id !== newItem.id));
  };

  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const itemTotal = (item) => {
    return item.price * item.quantity;
  };

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
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
