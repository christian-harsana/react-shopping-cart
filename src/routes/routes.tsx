import Home from '../pages/Home.tsx';
import Shop from '../pages/Shop.tsx';
import Cart from '../pages/Cart.tsx';
import Error from '../pages/Error.tsx';

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "cart",
    element: <Cart />,
  }
];

export default routes;