import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes/routes.tsx'
import './App.css'
import type { CartItem } from "./types/common.type"
import { CartContext } from './contexts/CartContext.tsx'


const router = createBrowserRouter(routes);

function App() {
  
  // VARIABLES
  // ----------------------------------

  const [cartItems, setCartItems] = useState<CartItem[] | []>([]);


  // HANDLERS
  // ----------------------------------

  const addToCart = (item: CartItem) => {

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

      // TODO: reallocate setProducts to accomodate the following
      // Reset the quantity to 1
      // setProducts(prev =>
      //     prev.map(product => product.id === id ? {...product, quantityToAdd: 1 } : product)
      // );
  }

  const removeFromCart = (itemId: string) => {

    setCartItems(prev => prev.filter(item => item.id !== itemId));

  }

  return (
    <CartContext value={{cartItems, addToCart, removeFromCart}}>
      <RouterProvider router={router} />
    </CartContext>
  )
}

export default App
