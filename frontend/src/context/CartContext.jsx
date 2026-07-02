import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("foodieCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [total, setTotal] = useState(0);

  // UPDATE TOTAL + LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("foodieCart", JSON.stringify(cart));

    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotal(newTotal);
  }, [cart]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exist = prevCart.find((item) => item._id === product._id);

      if (exist) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // DECREASE QTY (FIXED)
  const decreaseQty = (id) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};