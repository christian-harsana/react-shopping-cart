import { createContext } from "react";
import type { CartItemType } from "../types/common.type";

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, newQuantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
});