import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes/routes.tsx'
import './App.css'
import type { CartItemType } from "./types/common.type"
import { CartContext } from './contexts/CartContext.tsx'


const router = createBrowserRouter(routes);

function App() {
  
  // VARIABLES
  // ----------------------------------

  const [cartItems, setCartItems] = useState<CartItemType[] | []>([]);


  // HANDLERS
  // ----------------------------------

  // Cart - Add
  const addToCart = (item: CartItemType) => {

      setCartItems((prevCartItems) => {

        // Check if the item exist
        const itemIndex = prevCartItems.findIndex((prevItem) => prevItem.id === item.id);

        if (itemIndex === -1) {

          // Add new item 
          return [...prevCartItems, {
              id: item.id,
              name: item.name,
              imageURLSmall: item.imageURLSmall,
              price: item.price,
              quantityInCart: item.quantityInCart,
          }];

        }
        else {
          
          // Update quantity for target item
          const updatedItems = [...prevCartItems];
          updatedItems[itemIndex] = {...updatedItems[itemIndex], quantityInCart: updatedItems[itemIndex].quantityInCart + item.quantityInCart}

          return updatedItems;
        }
      });
  }

  // Cart - Remove
  const removeFromCart = (itemId: string) => {

    setCartItems(prev => prev.filter(item => item.id !== itemId));
  }

  // Cart - Update Quantity
  const updateCartQuantity = (itemId: string, newQuantity: number) => {

    setCartItems((prevCartItems) => {

      const itemIndex = prevCartItems.findIndex(prevItem => prevItem.id === itemId);
      const updatedItems = [...prevCartItems];
      updatedItems[itemIndex] = {...updatedItems[itemIndex], quantityInCart : newQuantity};
      
      return updatedItems;
    });

  }

  // RENDER
  // ----------------------------------

  return (
    <CartContext value={{cartItems, addToCart, removeFromCart, updateCartQuantity}}>
      <RouterProvider router={router} />
    </CartContext>
  )
}

export default App