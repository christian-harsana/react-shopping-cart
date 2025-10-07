import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function Navigation() {

    const {cartItems} = useContext(CartContext);
    let totalItemCount = 0;
    
    if (cartItems.length) {
        for (const item of cartItems) {
            totalItemCount += item.quantityInCart
        }
    }

    console.log("Render Navigation");

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
                <li>
                    <Link to="/cart">Cart ({totalItemCount})</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;