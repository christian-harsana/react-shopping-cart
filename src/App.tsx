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

      setCartItems(prev => 
          [...prev, {
              id: item.id,
              name: item.name,
              imageURLSmall: item.imageURLSmall,
              price: item.price,
              quantityInCart: item.quantityInCart,
          }]
      );

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
