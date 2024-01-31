import React, { ReactNode, useContext, createContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

// define type for shoppingcartContext
type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

// define what a CartItem looks like
type CartItem = {
  id: number;
  cartQuantity: number;
};

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id == id)?.cartQuantity || 0;
  }

  function increaseCartQuantity(id: number) {
    // if cartItem quantity = quantity of item break
    setCartItems((currentItems) => {
      if (cartItems.find((item) => item.id == id) == null) {
        return [...cartItems, { id, cartQuantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, cartQuantity: item.cartQuantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (cartItems.find((item) => item.id == id)?.cartQuantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, cartQuantity: item.cartQuantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
