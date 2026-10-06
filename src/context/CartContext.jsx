import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CART_STORAGE_KEY,
  addCartLine,
  cartTotals,
  createCartState,
  parseStoredCart,
  removeCartLine,
  updateCartLine,
} from "../commerce/cart.js";

const CartContext = createContext(null);

function initialCart() {
  if (typeof window === "undefined") return createCartState();
  return parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY));
}

export function CartProvider({ children }) {
  const [state, setState] = useState(initialCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      totals: cartTotals(state),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem(product, size, quantity = 1) {
        setState((current) => addCartLine(current, product, size, quantity));
        setIsOpen(true);
      },
      updateItem(key, quantity) {
        setState((current) => updateCartLine(current, key, quantity));
      },
      removeItem(key) {
        setState((current) => removeCartLine(current, key));
      },
    }),
    [state, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

